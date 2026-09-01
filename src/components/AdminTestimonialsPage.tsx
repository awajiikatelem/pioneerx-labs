import React, { useState, useEffect } from 'react';
import {
  getAllTestimonialsAdmin,
  updateTestimonialStatus,
  updateTestimonial,
  deleteTestimonial,
  isSupabaseConfigured,
} from '../lib/supabase';
import { isCloudinaryConfigured } from '../lib/cloudinary';
import { Testimonial, TestimonialStatus } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit3,
  Copy,
  Share2,
  Mail,
  MessageCircle,
  Star,
  Search,
  RefreshCw,
  AlertTriangle,
  Building2,
  Calendar,
  X,
  ArrowLeft,
  Database,
  UploadCloud,
  CheckCheck,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  Download,
} from 'lucide-react';


interface AdminTestimonialsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminTestimonialsPage: React.FC<AdminTestimonialsPageProps> = ({ onNavigate }) => {
  // Authentication Passcode State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pioneerx_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Data & Management State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filtering & Search
  const [statusFilter, setStatusFilter] = useState<'all' | TestimonialStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Copy Feedback State
  const [linkCopied, setLinkCopied] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editRating, setEditRating] = useState<number>(5);
  const [editReview, setEditReview] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const reviewSubmissionUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/testimonials/submit`
      : '/testimonials/submit';

  const adminSecret = import.meta.env.VITE_ADMIN_PASSCODE || 'PioneerX2026!';

  // Unlock Admin Panel
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === adminSecret.trim()) {
      sessionStorage.setItem('pioneerx_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('');
    } else {
      setAuthError('Access Denied: Invalid Security Key. Please try again.');
    }
  };

  // Lock Admin Panel
  const handleLogout = () => {
    sessionStorage.removeItem('pioneerx_admin_auth');
    setIsAuthenticated(false);
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await getAllTestimonialsAdmin();
      setTestimonials(res.data);
      if (res.error) {
        setErrorMsg(`Supabase Database Warning: ${res.error}. If you haven't created the 'testimonials' table in Supabase yet, please copy and run the SQL script from 'supabase_schema.sql' in your Supabase SQL Editor.`);
      }
    } catch (err: any) {
      setErrorMsg('Failed to load testimonials: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Compute Statistics
  const totalCount = testimonials.length;
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length;
  const rejectedCount = testimonials.filter((t) => t.status === 'rejected').length;

  const averageRating =
    totalCount > 0
      ? (
          testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalCount
        ).toFixed(1)
      : '0.0';

  // Handle Status Update (Approve / Reject)
  const handleStatusChange = async (id: string, newStatus: TestimonialStatus) => {
    setActionLoadingId(id);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await updateTestimonialStatus(id, newStatus);
    setActionLoadingId(null);

    if (res.success) {
      setSuccessMsg(`Testimonial status updated to ${newStatus.toUpperCase()}`);
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to update status.');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial permanently?')) {
      return;
    }

    setActionLoadingId(id);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await deleteTestimonial(id);
    setActionLoadingId(null);

    if (res.success) {
      setSuccessMsg('Testimonial deleted successfully.');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to delete testimonial.');
    }
  };

  // Open Edit Modal
  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setEditName(item.full_name || item.name || '');
    setEditRole(item.role || '');
    setEditCompany(item.company || '');
    setEditRating(item.rating || 5);
    setEditReview(item.review || item.quote || '');
    setEditPhotoUrl(item.photo_url || item.image || '');
  };

  // Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSavingEdit(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await updateTestimonial(editingItem.id, {
      full_name: editName,
      name: editName,
      role: editRole,
      company: editCompany,
      rating: editRating,
      review: editReview,
      photo_url: editPhotoUrl,
    });

    setIsSavingEdit(false);

    if (res.success) {
      setSuccessMsg('Testimonial updated successfully.');
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingItem.id
            ? {
                ...t,
                full_name: editName,
                name: editName,
                role: editRole,
                company: editCompany,
                rating: editRating,
                review: editReview,
                photo_url: editPhotoUrl,
                image: editPhotoUrl,
              }
            : t
        )
      );
      setEditingItem(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to save edits.');
    }
  };

  // Copy Review Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewSubmissionUrl).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  // Export Testimonials as CSV Spreadsheet
  const handleExportCSV = () => {
    if (testimonials.length === 0) return;

    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Role',
      'Company',
      'Rating',
      'Review',
      'Status',
      'Permission Granted',
      'Date Submitted',
    ];

    const rows = testimonials.map((t) => [
      t.id,
      `"${(t.full_name || t.name || '').replace(/"/g, '""')}"`,
      `"${(t.email || '').replace(/"/g, '""')}"`,
      `"${(t.role || '').replace(/"/g, '""')}"`,
      `"${(t.company || '').replace(/"/g, '""')}"`,
      t.rating,
      `"${(t.review || t.quote || '').replace(/"/g, '""')}"`,
      t.status,
      t.permission_granted ? 'Yes' : 'No',
      `"${t.date || t.created_at || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pioneerx_testimonials_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Share via WhatsApp
  const whatsappMessage = `Hi! We'd love to hear about your experience working with PioneerX Labs. Please take a moment to share your feedback here: ${reviewSubmissionUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  // Share via Email
  const emailSubject = 'Share Your Experience with PioneerX Labs';
  const emailBody = `Hi!\n\nWe'd love to hear about your experience working with PioneerX Labs. Please take a moment to share your feedback here:\n${reviewSubmissionUrl}\n\nThank you!`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Filtered list
  const filteredTestimonials = testimonials.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (t.full_name || t.name || '').toLowerCase().includes(q);
      const matchEmail = (t.email || '').toLowerCase().includes(q);
      const matchCompany = (t.company || '').toLowerCase().includes(q);
      const matchRole = (t.role || '').toLowerCase().includes(q);
      const matchReview = (t.review || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchCompany || matchRole || matchReview;
    }

    return true;
  });

  // ── PASSCODE LOCK SCREEN ──────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background ambient glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md mx-auto px-4 relative z-10">
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl space-y-6 text-center bg-slate-950/90 relative overflow-hidden">
            {/* Ambient top border */}
            <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 absolute top-0 left-0 right-0" />

            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[11px] font-semibold border border-sky-500/20 uppercase tracking-wider">
                <KeyRound className="w-3 h-3" />
                <span>Security Gate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Admin Console
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Please enter the PioneerX Labs security key to manage testimonials.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 text-left pt-2">
              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Security Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Enter security key..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-600 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer p-1"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Console</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/')}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                ← Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED ADMIN DASHBOARD ─────────────────────────────
  return (
    <div className="pt-28 pb-24 relative overflow-hidden min-h-screen">
      {/* Background ambient glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header navigation bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => onNavigate('/testimonials')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Testimonials</span>
          </button>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Local Storage Fallback'}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                isCloudinaryConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isCloudinaryConfigured ? 'Cloudinary Active' : 'Cloudinary Pending'}</span>
            </span>

            {/* Lock / Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all cursor-pointer shadow-sm"
              title="Lock Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>PioneerX Admin Console</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Testimonial <span className="gradient-text">Management</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Review, approve, edit, or reject submitted client testimonials before they appear publicly.
          </p>
        </div>

        {/* Global Alert Messages */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg('')} className="text-rose-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── SECTION 1: STATISTICS CARDS ───────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{totalCount}</div>
            <span className="text-[11px] text-slate-500">Submissions</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-1">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Pending</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">{pendingCount}</div>
            <span className="text-[11px] text-amber-400/70">Awaiting approval</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Approved</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">{approvedCount}</div>
            <span className="text-[11px] text-emerald-400/70">Live on website</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-1">
            <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Rejected</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-300 font-mono">{rejectedCount}</div>
            <span className="text-[11px] text-rose-400/70">Hidden from public</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-sky-500/30 bg-sky-500/5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">Avg Rating</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono flex items-center gap-1.5">
              <span>{averageRating}</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-sky-400/70">Out of 5.0 stars</span>
          </div>
        </div>

        {/* ── SECTION 2: INVITE CLIENTS TO REVIEW ───────────────── */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl mb-12 relative overflow-hidden bg-slate-950/80">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-sky-400" />
                  <h2 className="text-xl font-bold text-white">Invite Clients to Review PioneerX Labs</h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Send this link to clients via WhatsApp, email, or direct messaging to collect authentic feedback.
                </p>
              </div>

              {/* Copy Review Link Action */}
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-lg ${
                  linkCopied
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 scale-[0.98]'
                    : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/25'
                }`}
              >
                {linkCopied ? (
                  <>
                    <CheckCheck className="w-4 h-4" />
                    <span>Review link copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Review Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* URL Display */}
              <div className="md:col-span-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 truncate">
                <span className="text-slate-500 uppercase font-sans text-[10px] font-bold tracking-wider">Link:</span>
                <span className="truncate select-all">{reviewSubmissionUrl}</span>
              </div>

              {/* Quick Share Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: SEARCH & FILTER BAR ────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'pending'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <span>Pending</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px]">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'approved'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-emerald-500/30'
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('rejected')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'rejected'
                  ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 text-rose-400 hover:bg-slate-800 border border-rose-500/30'
              }`}
            >
              Rejected ({rejectedCount})
            </button>
          </div>

          {/* Search Box, Export & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, email, review..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleExportCSV}
              disabled={testimonials.length === 0}
              title="Export Testimonials to CSV Spreadsheet"
              className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={loadData}
              title="Refresh Data"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>

        {/* ── SECTION 4: TESTIMONIAL CARDS LIST ──────────────────── */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
            <p className="text-slate-400 text-sm">Loading admin testimonial records...</p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 space-y-4">
            <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-xl font-bold text-white">No Testimonials Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {statusFilter !== 'all'
                ? `There are no testimonials currently marked as ${statusFilter}.`
                : 'No testimonial submissions have been received yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTestimonials.map((item) => {
              const displayName = item.full_name || item.name || 'Anonymous';
              const photo = item.photo_url || item.image || item.avatar;

              const initials = displayName
                .split(' ')
                .filter(Boolean)
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase() || 'PX';

              const isActioning = actionLoadingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`glass-panel rounded-2xl p-6 border transition-all space-y-5 relative bg-slate-950/70 ${
                    item.status === 'pending'
                      ? 'border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : item.status === 'approved'
                      ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                      : 'border-rose-500/20 opacity-75'
                  }`}
                >
                  {/* Status Ribbon Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          item.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : item.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'pending'
                              ? 'bg-amber-400 animate-pulse'
                              : item.status === 'approved'
                              ? 'bg-emerald-400'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>{item.status}</span>
                      </span>

                      {item.permission_granted && (
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Permission Granted
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date || 'Recent'}</span>
                    </span>
                  </div>

                  {/* Client Info Block */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
                      {photo ? (
                        <img src={photo} alt={displayName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-base">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-bold text-white text-base truncate">{displayName}</h3>
                      
                      {/* Email address (Admin visible) */}
                      {item.email && (
                        <p className="text-xs text-sky-300 flex items-center gap-1 truncate font-mono">
                          <Mail className="w-3 h-3 text-sky-400 flex-shrink-0" />
                          <span className="truncate">{item.email}</span>
                        </p>
                      )}

                      {(item.role || item.company) && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 truncate">
                          <Building2 className="w-3 h-3 text-slate-500 flex-shrink-0" />
                          <span className="truncate">
                            {item.role} {item.role && item.company ? 'at' : ''} {item.company}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= item.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-slate-400 ml-1.5 font-mono">
                      {item.rating}.0 / 5.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                      "{item.review || item.quote}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.status !== 'approved' && (
                        <button
                          disabled={isActioning}
                          onClick={() => handleStatusChange(item.id, 'approved')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                      )}

                      {item.status !== 'rejected' && (
                        <button
                          disabled={isActioning}
                          onClick={() => handleStatusChange(item.id, 'rejected')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 transition-colors cursor-pointer"
                        title="Edit Testimonial"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        disabled={isActioning}
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ── EDIT MODAL ─────────────────────────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-400" />
                <span>Edit Testimonial</span>
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Client Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Star Rating (1-5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= editRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 font-mono ml-2">{editRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editPhotoUrl}
                  onChange={(e) => setEditPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Review Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={editReview}
                  onChange={(e) => setEditReview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 cursor-pointer shadow-lg shadow-sky-400/20 disabled:opacity-50"
                >
                  {isSavingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
