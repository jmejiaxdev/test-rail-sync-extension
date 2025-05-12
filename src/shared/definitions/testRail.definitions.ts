import { readApiSettings } from "../../extension/config/settings.config";

const { organizationUrl = "", username = "", key = "", projectId = "" } = readApiSettings() || {};

if (!organizationUrl || !username || !key || !projectId) throw new Error("API settings are missing");

export const TEST_RAIL_CLIENT = {
  baseUrl: `${organizationUrl}/api/v2`,
  options: {
    auth: { username, password: key },
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  },
  queryParams: { projectId },
};
