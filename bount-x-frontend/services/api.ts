// API Service for BounT-X Frontend
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('bountx_admin_token');
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Public endpoints
  async submitApplication(applicationData: any) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getMeetups() {
    return this.request('/meetups');
  }

  async getUpcomingHackathon() {
    return this.request('/hackathons/upcoming');
  }

  async getPastWinners() {
    return this.request('/hackathons/past-winners');
  }

  async getBuildProjects() {
    return this.request('/build-projects');
  }

  async healthCheck() {
    return this.request('/health');
  }

  // Admin authentication
  async adminLogin(email: string, password: string) {
    const response = await this.request('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('bountx_admin_token', response.token);
    }
    
    return response;
  }

  adminLogout() {
    this.token = null;
    localStorage.removeItem('bountx_admin_token');
  }

  // Admin endpoints
  async getKPIs() {
    return this.request('/admin/stats/kpis');
  }

  async getMemberGrowth() {
    return this.request('/admin/stats/member-growth');
  }

  async getSkillDistribution() {
    return this.request('/admin/stats/skill-distribution');
  }

  async getApplications(filters?: { status?: string; q?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.q) params.append('q', filters.q);
    
    const query = params.toString();
    return this.request(`/admin/applications${query ? `?${query}` : ''}`);
  }

  async updateApplicationStatus(id: number, status: string) {
    return this.request(`/admin/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getAdminMeetups() {
    return this.request('/admin/meetups');
  }

  async createMeetup(meetupData: any) {
    return this.request('/admin/meetups', {
      method: 'POST',
      body: JSON.stringify(meetupData),
    });
  }

  async updateMeetup(id: number, meetupData: any) {
    return this.request(`/admin/meetups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(meetupData),
    });
  }

  async deleteMeetup(id: number) {
    return this.request(`/admin/meetups/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminHackathons() {
    return this.request('/admin/hackathons/upcoming');
  }

  async updateUpcomingHackathon(hackathonData: any) {
    return this.request('/admin/hackathons/upcoming', {
      method: 'PUT',
      body: JSON.stringify(hackathonData),
    });
  }

  async getAdminPastWinners() {
    return this.request('/admin/hackathons/past-winners');
  }

  async addHackathonWinner(winnerData: any) {
    return this.request('/admin/hackathons/past-winners', {
      method: 'POST',
      body: JSON.stringify(winnerData),
    });
  }

  async deleteHackathonWinner(id: number) {
    return this.request(`/admin/hackathons/past-winners/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminBuildProjects() {
    return this.request('/admin/build-projects');
  }

  async createBuildProject(projectData: any) {
    return this.request('/admin/build-projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateBuildProject(id: number, projectData: any) {
    return this.request(`/admin/build-projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteBuildProject(id: number) {
    return this.request(`/admin/build-projects/${id}`, {
      method: 'DELETE',
    });
  }

  async getMetrics() {
    return this.request('/admin/metrics');
  }

  async updateMetric(id: number, value: number) {
    return this.request(`/admin/metrics/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;