import axios from "axios";
import { Section } from "../../../shared/definitions/section.definitions";
import { TEST_RAIL_CLIENT } from "../../../shared/definitions/testRail.definitions";

export async function getSections(id: Section["id"]): Promise<Section[]> {
  const { baseUrl, options, queryParams } = TEST_RAIL_CLIENT;
  const response = await axios.get(`${baseUrl}/get_sections/${queryParams.projectId}&suite_id=${id}`, options);
  return response.data.sections as Section[];
}
