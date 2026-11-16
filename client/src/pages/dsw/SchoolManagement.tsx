import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { School } from '../../types';
import { DataTable, Column } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import { School as SchoolIcon, PlusCircle, Edit3, CheckCircle2 } from 'lucide-react';

export const SchoolManagement: React.FC = () => {
  const { showToast } = useNotification();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  // Add/Edit Modal
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [deanName, setDeanName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [departmentsStr, setDepartmentsStr] = useState('');
  const [programmesStr, setProgrammesStr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    try {
      const res = await api.getSchools();
      if (res.success && res.data) {
        setSchools(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setName('');
    setCode('');
    setDescription('');
    setDeanName('');
    setContactEmail('');
    setDepartmentsStr('');
    setProgrammesStr('');
    setEditingSchool({} as any);
  };

  const handleOpenEdit = (school: School) => {
    setIsNew(false);
    setName(school.name);
    setCode(school.code);
    setDescription(school.description || '');
    setDeanName(school.deanName || '');
    setContactEmail(school.contactEmail || '');
    setDepartmentsStr(school.departments?.join(', ') || '');
    setProgrammesStr(school.programmes?.join(', ') || '');
    setEditingSchool(school);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name,
        code,
        description,
        deanName,
        contactEmail,
        departments: departmentsStr.split(',').map((d) => d.trim()).filter(Boolean),
        programmes: programmesStr.split(',').map((p) => p.trim()).filter(Boolean),
      };

      if (isNew) {
        const res = await api.createSchool(payload);
        if (res.success) {
          showToast('School created successfully!', 'success');
          setEditingSchool(null);
          loadSchools();
        } else {
          showToast(res.message || 'Creation failed', 'error');
        }
      } else if (editingSchool) {
        const res = await api.updateSchool(editingSchool._id, payload);
        if (res.success) {
          showToast('School updated successfully!', 'success');
          setEditingSchool(null);
          loadSchools();
        } else {
          showToast(res.message || 'Update failed', 'error');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Error occurred', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<School>[] = [
    {
      header: 'Code / School Name',
      render: (s) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
              {s.code}
            </span>
            <span className="font-bold text-slate-900">{s.name}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{s.description}</p>
        </div>
      ),
    },
    {
      header: 'Dean / Head',
      accessor: 'deanName',
    },
    {
      header: 'Contact Email',
      accessor: 'contactEmail',
    },
    {
      header: 'Departments',
      render: (s) => <span className="font-semibold text-slate-700">{s.departments?.length || 0} Depts</span>,
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (s) => (
        <button
          onClick={() => handleOpenEdit(s)}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          title="Edit School Master"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Schools of CT University</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Master Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic institutional structure: Manage departments, degree programmes, deans, and coordinators.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add New School</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={schools}
        searchPlaceholder="Search schools by name, code, or dean..."
        searchFilter={(s, q) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          (s.deanName || '').toLowerCase().includes(q)
        }
      />

      {/* Add / Edit Modal */}
      {editingSchool && (
        <Modal
          isOpen={Boolean(editingSchool)}
          onClose={() => setEditingSchool(null)}
          title={isNew ? 'Add Institutional School' : `Edit: ${editingSchool.name}`}
          maxWidth="xl"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">School Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. School of Engineering and Technology"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Code *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SOET"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 uppercase font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Institutional profile..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dean / Director Name</label>
                <input
                  type="text"
                  value={deanName}
                  onChange={(e) => setDeanName(e.target.value)}
                  placeholder="Dr. Harmeet Singh"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="dean.soet@ctuniversity.in"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Departments (Comma-separated)
              </label>
              <input
                type="text"
                value={departmentsStr}
                onChange={(e) => setDepartmentsStr(e.target.value)}
                placeholder="Computer Science, AI & ML, Civil Engineering"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Degree Programmes (Comma-separated)
              </label>
              <input
                type="text"
                value={programmesStr}
                onChange={(e) => setProgrammesStr(e.target.value)}
                placeholder="B.Tech CSE, BCA, MCA, M.Tech"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingSchool(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submitting ? 'Saving...' : 'Save School'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
