import axios from "axios";
import type { TestCase } from "../../../shared/definitions/testCase.definitions";
import { TEST_RAIL_CLIENT } from "../../../shared/definitions/testRail.definitions";

export async function addCase(testCase: TestCase): Promise<TestCase> {
  const { baseUrl, options } = TEST_RAIL_CLIENT;
  const response = await axios.post(`${baseUrl}/add_case/${testCase.section_id}`, testCase, options);
  return response.data;
}

export async function getCase(id: TestCase["id"]): Promise<TestCase> {
  const { baseUrl, options } = TEST_RAIL_CLIENT;
  const response = await axios.get(`${baseUrl}/get_case/${id}`, options);
  return response.data;
}

export async function updateCase(testCase: TestCase): Promise<TestCase> {
  const { baseUrl, options } = TEST_RAIL_CLIENT;
  const { id, ...data } = testCase;
  const response = await axios.post(`${baseUrl}/update_case/${id}`, data, options);
  return response.data;
}
