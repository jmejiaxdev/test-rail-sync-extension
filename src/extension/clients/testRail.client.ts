import axios from "axios";
import { Section } from "../../shared/definitions/section.definitions";
import { Suite } from "../../shared/definitions/suite.definitions";
import type { TestCase } from "../../shared/definitions/testCase.definitions";
import { readApiSettings } from "./vsCode.client";

const { organizationUrl, username = "", key = "", projectId } = readApiSettings();
const baseUrl = `${organizationUrl}/api/v2`;
const options = {
  auth: {
    username,
    password: key,
  },
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
};

export async function getSections(id: Section["id"]): Promise<Section[]> {
  const response = await axios.get(`${baseUrl}/get_sections/${projectId}&suite_id=${id}`, options);
  return response.data.sections as Section[];
}

export async function getSuites(): Promise<Suite[]> {
  const response = await axios.get(`${baseUrl}/get_suites/${projectId}`, options);
  return response.data as Suite[];
}

export async function addCase(testCase: TestCase): Promise<TestCase> {
  const response = await axios.post(`${baseUrl}/add_case/${testCase.section_id}`, testCase, options);
  return response.data;
}

export async function getCase(id: TestCase["id"]): Promise<TestCase> {
  const response = await axios.get(`${baseUrl}/get_case/${id}`, options);
  return response.data;
}

export async function updateCase(testCase: TestCase): Promise<TestCase> {
  const { id, ...data } = testCase;
  const response = await axios.post(`${baseUrl}/update_case/${id}`, data, options);
  return response.data;
}
