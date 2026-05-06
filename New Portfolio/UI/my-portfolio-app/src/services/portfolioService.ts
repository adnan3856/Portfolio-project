import apiClient from "./apiClient";

export const portfolioService = {
  getProfile: async (username: string) => {
    return apiClient.get(`/profiles/${username}`).then((res) => res.data);
  },

  createProfile: async (data: any) => {
    return apiClient.post(`/profiles/save`, data).then((res) => res.data);
  },

  updateProfile: async (username: string, data: any) => {
    return apiClient.post(`/profiles/update/${username}`, data).then((res) => res.data);
  },
  
  getAbout: async (username: string) => {
    return apiClient.get(`/about/${username}`).then((res) => res.data);
  },
  saveAbout: async (username: string, data: any) => {
    return apiClient.post(`/about/save/${username}`, data).then((res) => res.data);
  },
  
  getSkills: async (username: string) => {
    return apiClient.get(`/skills/${username}`).then((res) => res.data);
  },
  saveSkill: async (username: string, data: any) => {
    return apiClient.post(`/skills/save/${username}`, data).then((res) => res.data);
  },
  deleteSkill: async (id: string) => {
    return apiClient.delete(`/skills/${id}`).then((res) => res.data);
  },
  
  getExperience: async (username: string) => {
    return apiClient.get(`/experiences/${username}`).then((res) => res.data);
  },
  saveExperience: async (username: string, data: any) => {
    return apiClient.post(`/experiences/save/${username}`, data).then((res) => res.data);
  },
  deleteExperience: async (id: string) => {
    return apiClient.delete(`/experiences/${id}`).then((res) => res.data);
  },
  
  getAchievements: async (username: string) => {
    return apiClient.get(`/achievements/${username}`).then((res) => res.data);
  },
  saveAchievement: async (username: string, data: any) => {
    return apiClient.post(`/achievements/save/${username}`, data).then((res) => res.data);
  },
  deleteAchievement: async (id: string) => {
    return apiClient.delete(`/achievements/${id}`).then((res) => res.data);
  },
  
  getContact: async (username: string) => {
    return apiClient.get(`/contact/${username}`).then((res) => res.data);
  },
  saveContact: async (username: string, data: any) => {
    return apiClient.post(`/contact/save/${username}`, data).then((res) => res.data);
  },
};
