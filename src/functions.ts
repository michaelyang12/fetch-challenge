import axios, { AxiosResponse } from "axios";
import { api, requestConfig } from "./constants";
import { Dog } from "./models";

// Global function to fetch dog objects given an array of dog ids
export const getDogObjectsFromIds = async (
  ids: string[],
  handleSetDogData: (dogData: Dog[]) => void,
  handleSetAuthorization: (value: boolean) => void,
) => {
  const url = `${api}dogs`;

  try {
    const response: AxiosResponse = await axios.post(url, ids, requestConfig);
    console.log("dog objects", response.data);
    handleSetDogData(response.data);
  } catch (error: unknown) {
    console.error("dogs error", error.message);
    if (axios.isAxiosError(error) && error.status === 401) {
      handleSetAuthorization(false);
    }
  }
};
