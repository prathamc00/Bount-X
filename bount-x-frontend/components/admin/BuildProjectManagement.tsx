import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

interface BuildProject {
  id: number;
  title: string;
  creator: string;
  description: string;
  status: 'In Progress' | 'Launched' | 'Funded';
  image: string;
  repo_url: string;
  tech_stack: string[];
  created_at: string;
}

const BuildProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<BuildProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<BuildProject | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAdminBuildProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingProject) {
        await apiService.updateBuildProject(editingProject.id, formData);
      } else {
        await apiService.createBuildProject(formData);
      }
      setShowForm(false);
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await apiService.deleteBuildProject(id);
        loadProjects();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-semibold text-neutral-900">Build Project Management</h1>
        <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Build Project Management</h1>
          <p className="text-neutral-500 mt-1">Manage community build projects.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadProjects}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
            {project.image && (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-neutral-800">{project.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'Launched' ? 'bg-green-100 text-green-800' :
                  project.status === 'Funded' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mb-2">By {project.creator}</p>
              <p className="text-sm text-neutral-600 mb-3">{project.description}</p>
              
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech_stack.map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="bg-white border border-neutral-200 rounded-lg p-10 shadow-sm text-center text-neutral-500">
          <p className="font-semibold">No projects found</p>
          <p className="text-sm">Create your first project to get started.</p>
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};

const ProjectForm: React.FC<{
  project: BuildProject | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    creator: project?.creator || '',
    description: project?.description || '',
    status: project?.status || 'In Progress',
    image: project?.image || '',
    repo_url: project?.repo_url || '',
    tech_stack: project?.tech_stack?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(t => t)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Creator</label>
            <input
              type="text"
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="In Progress">In Progress</option>
              <option value="Launched">Launched</option>
              <option value="Funded">Funded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Repository URL</label>
            <input
              type="url"
              value={formData.repo_url}
              onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={formData.tech_stack}
              onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {project ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-neutral-200 text-neutral-800 py-2 px-4 rounded-md hover:bg-neutral-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildProjectManagement;