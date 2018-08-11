import { METADATA_KEY } from "../enums/metadata-keys.enum";

export interface IStorage {
  target: any;
  key: string;
  metadataKey: METADATA_KEY;
}