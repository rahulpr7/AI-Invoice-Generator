import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

// Use Vite env vars as the API base; fall back to empty string for local dev
const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || "";

/* ---------- Icons ---------- */
const UploadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const ImageIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const DeleteIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const SaveIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const ResetIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

/* ---------- Styles (Tailwind Mapping) ---------- */
const styles = {
  container: "max-w-5xl mx-auto p-6 space-y-8",
  card: "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
  input: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all",
  label: "block text-sm font-semibold text-gray-700 mb-1",
  uploadArea: "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-50",
  previewImg: "max-h-32 object-contain rounded",
  btnPrimary: "flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all",
  btnSecondary: "flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700"
};

function resolveImageUrl(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (s.startsWith("blob:") || s.startsWith("data:")) return s;
  if (s.startsWith("http")) return s;
  // If API_BASE is not set, return the raw path so local previews still work
  return API_BASE ? `${API_BASE}/${s.replace(/^\/+/, "")}` : s;
}

export default function BusinessProfile() {
  const { getToken, isSignedIn } = useAuth();
  const [meta, setMeta] = useState({
    businessName: "", email: "", address: "", phone: "", gst: "",
    signatureOwnerName: "", signatureOwnerTitle: "", defaultTaxPercent: 18, notes: ""
  });
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState({ logo: null, stamp: null, signature: null });
  const [previews, setPreviews] = useState({ logo: null, stamp: null, signature: null });

  async function getAuthToken() {
    try {
      let t = await getToken({ template: "default" });
      if (!t) t = await getToken({ forceRefresh: true });
      return t;
    } catch { return null; }
  }

  useEffect(() => {
    async function fetchProfile() {
      if (!isSignedIn) return;
      const token = await getAuthToken();
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/businessProfile/me`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        if (res.ok) {
          const json = await res.json();
          const data = json?.data || {};
          setMeta({ ...data, profileId: data._id || data.id });
          setPreviews({
            logo: resolveImageUrl(data.logoUrl),
            stamp: resolveImageUrl(data.stampUrl),
            signature: resolveImageUrl(data.signatureUrl),
          });
        }
      } catch (err) { console.error("Fetch error:", err); }
    }
    fetchProfile();
  }, [isSignedIn]);

  const updateMeta = (field, value) => setMeta(prev => ({ ...prev, [field]: value }));

  const handleLocalFilePick = (kind, file) => {
    if (!file) return;
    if (previews[kind]?.startsWith("blob:")) URL.revokeObjectURL(previews[kind]);
    const objUrl = URL.createObjectURL(file);
    setFiles(f => ({ ...f, [kind]: file }));
    setPreviews(p => ({ ...p, [kind]: objUrl }));
  };

  const removeLocalFile = (kind) => {
    setFiles(f => ({ ...f, [kind]: null }));
    setPreviews(p => ({ ...p, [kind]: null }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = await getAuthToken();
      const fd = new FormData();
      Object.keys(meta).forEach(key => fd.append(key, meta[key] || ""));
      // Append file blobs under predictable keys expected by the API
      if (files.logo) fd.append("logo", files.logo);
      if (files.stamp) fd.append("stamp", files.stamp);
      if (files.signature) fd.append("signature", files.signature);

      const method = meta.profileId ? "PUT" : "POST";
      const url = meta.profileId ? `${API_BASE}/api/businessProfile/${meta.profileId}` : `${API_BASE}/api/businessProfile`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Save failed");
      }
      alert("Profile Saved!");
    } catch (err) {
      alert(err.message);
    } finally { setSaving(false); }
  };

  return (
    <div className={styles.container}>
      <header className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
          <p className="text-gray-500 text-sm">Manage your branding and invoice defaults</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.location.reload()} className={styles.btnSecondary}>
            <ResetIcon /> Reset
          </button>
          <button onClick={handleSave} disabled={saving || !isSignedIn} className={styles.btnPrimary}>
            <SaveIcon /> {saving ? "Saving..." : !isSignedIn ? "Sign in to Save" : "Save Profile"}
          </button>
        </div>
      </header>

      <form className="space-y-8" onSubmit={handleSave}>
        {/* Section 1: Basic Info */}
        <div className={styles.card}>
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
             <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon /></div>
             <h2 className="text-lg font-semibold">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={styles.label}>Business Name</label>
              <input value={meta.businessName} onChange={e => updateMeta("businessName", e.target.value)} className={styles.input} placeholder="e.g. Acme Corp" />
            </div>
            <div>
              <label className={styles.label}>Email Address</label>
              <input value={meta.email} onChange={e => updateMeta("email", e.target.value)} className={styles.input} placeholder="billing@acme.com" />
            </div>
            <div className="md:col-span-2">
              <label className={styles.label}>Address</label>
              <textarea value={meta.address} onChange={e => updateMeta("address", e.target.value)} className={`${styles.input} h-20`} placeholder="Street, City, Zip" />
            </div>
            <div>
              <label className={styles.label}>GST / Tax ID</label>
              <input value={meta.gst} onChange={e => updateMeta("gst", e.target.value)} className={styles.input} placeholder="GSTIN12345" />
            </div>
            <div>
              <label className={styles.label}>Default Tax (%)</label>
              <input type="number" value={meta.defaultTaxPercent} onChange={e => updateMeta("defaultTaxPercent", e.target.value)} className={styles.input} />
            </div>
          </div>
        </div>

        {/* Section 2: Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Upload */}
          <div className={styles.card}>
            <h3 className="font-semibold mb-4 text-gray-700 text-center">Company Logo</h3>
            <div className={styles.uploadArea}>
              {previews.logo ? (
                <div className="text-center">
                  <img src={previews.logo} className={styles.previewImg} alt="logo" />
                  <div className="flex gap-2 mt-4">
                    <button type="button" onClick={() => removeLocalFile("logo")} className="text-red-500 text-xs flex items-center gap-1"><DeleteIcon /> Remove</button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer text-center">
                  <UploadIcon className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Logo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={e => handleLocalFilePick("logo", e.target.files[0])} />
                </label>
              )}
            </div>
          </div>

          {/* Stamp Upload */}
          <div className={styles.card}>
            <h3 className="font-semibold mb-4 text-gray-700 text-center">Digital Stamp</h3>
            <div className={styles.uploadArea}>
              {previews.stamp ? (
                <div className="text-center">
                  <img src={previews.stamp} className={styles.previewImg} alt="stamp" />
                  <button type="button" onClick={() => removeLocalFile("stamp")} className="block mx-auto mt-4 text-red-500 text-xs"><DeleteIcon /> Remove</button>
                </div>
              ) : (
                <label className="cursor-pointer text-center">
                  <ImageIcon className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Stamp</span>
                  <input type="file" className="hidden" accept="image/*" onChange={e => handleLocalFilePick("stamp", e.target.files[0])} />
                </label>
              )}
            </div>
          </div>

          {/* Signature Upload */}
          <div className={styles.card}>
            <h3 className="font-semibold mb-4 text-gray-700 text-center">Signature</h3>
            <div className={styles.uploadArea}>
              {previews.signature ? (
                <div className="text-center">
                  <img src={previews.signature} className={styles.previewImg} alt="signature" />
                  <button type="button" onClick={() => removeLocalFile("signature")} className="block mx-auto mt-4 text-red-500 text-xs"><DeleteIcon /> Remove</button>
                </div>
              ) : (
                <label className="cursor-pointer text-center">
                  <UploadIcon className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Sign</span>
                  <input type="file" className="hidden" accept="image/*" onChange={e => handleLocalFilePick("signature", e.target.files[0])} />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Signature Details */}
        <div className={styles.card}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={styles.label}>Signature Owner Name</label>
              <input value={meta.signatureOwnerName} onChange={e => updateMeta("signatureOwnerName", e.target.value)} className={styles.input} placeholder="John Doe" />
            </div>
            <div>
              <label className={styles.label}>Designation</label>
              <input value={meta.signatureOwnerTitle} onChange={e => updateMeta("signatureOwnerTitle", e.target.value)} className={styles.input} placeholder="Managing Director" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}