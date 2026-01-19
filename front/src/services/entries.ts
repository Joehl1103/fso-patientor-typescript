import axios from "axios";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";

interface EntryPostObject {
  entry: Entry,
  id: string
}

async function addEntry(entryPostObject: EntryPostObject): Promise<Entry[]> {
  const res = await axios.post(`${apiBaseUrl}/entries/${entryPostObject.id}`, entryPostObject);
  return res.data;
}

export default {
  addEntry
};

