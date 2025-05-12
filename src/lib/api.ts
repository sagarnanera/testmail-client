import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api.testmail.app/api/json'; // pass the api key and the inbox id as search params

export interface Email {
  id: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  html: string;
  text: string;
  source: string;
  read: boolean;
}

export class TestmailClient {
  private apiToken: string;
  private inboxId: string;

  constructor(apiToken: string, inboxId: string) {
    this.apiToken = apiToken;
    this.inboxId = inboxId;
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'API request failed');
    }
    throw error;
  }

  async getEmails(
    offset = 0,
    limit = 10,
    tagPrefix?: string,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<{ emails: Email[]; count: number; message?: string }> {
    try {
      const params: Record<string, string | number> = {
        apikey: this.apiToken,
        namespace: this.inboxId,
        offset,
        limit,
      };
      if (tagPrefix) params.tag_prefix = tagPrefix;
      if (dateFrom) params.timestamp_from = Math.floor(new Date(dateFrom).getTime() / 1000);
      if (dateTo) params.timestamp_to = Math.floor(new Date(dateTo).getTime() / 1000);
      const response = await axios.get(`${API_BASE_URL}`, {
        params,
      });
      return {
        emails: response.data.emails,
        count: response.data.count,
        message: response.data.message,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getEmail(id: string): Promise<Email> {
    try {
      const response = await axios.get(`${API_BASE_URL}/emails/${id}`, {
        params: {
          apikey: this.apiToken,
          namespace: this.inboxId,
        },
      });

      console.log({ res: response.data });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
