import axios from "axios";
import { Suite } from "../../../shared/definitions/suite.definitions";
import { TEST_RAIL_CLIENT } from "../../../shared/definitions/testRail.definitions";

export async function getSuites(): Promise<Suite[]> {
  const { baseUrl, options, queryParams } = TEST_RAIL_CLIENT;
  const response = await axios.get(`${baseUrl}/get_suites/${queryParams.projectId}`, options);
  return response.data as Suite[];
}
