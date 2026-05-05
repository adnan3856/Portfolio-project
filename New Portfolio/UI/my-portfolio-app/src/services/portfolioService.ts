import apiClient from "./apiClient";

export const portfolioService = {
  getProfile: async (username: string) => {
    return apiClient.get(`/profile/${username}`).then((res) => res.data);
  },

  updateProfile: async (username: string, data: any) => {
    return apiClient.put(`/profile/${username}`, data).then((res) => res.data);
  },
  
  getAbout: async (username: string) => {
    return apiClient.get(`/about/${username}`).then((res) => res.data);
  },
  
  getSkills: async (username: string) => {
    return apiClient.get(`/skills/${username}`).then((res) => res.data);
  },
  
  getExperience: async (username: string) => {
    return apiClient.get(`/experience/${username}`).then((res) => res.data);
  },
  
  getAchievements: async (username: string) => {
    return apiClient.get(`/achievements/${username}`).then((res) => res.data);
  },
  // Note: Contact API might vary based on whether you are fetching the contact info or messages
  getContact: async (username: string) => {
    return apiClient.get(`/contact/${username}`).then((res) => res.data);
  },
};
