import axios from "axios";

const baseUrl = "https://api.spacexdata.com/v4/";

export const fetchData = async ({
  params,
}: {
  params: string;
}): Promise<any[]> => {
  try {
    let result = [];
    if (params == "launches") {
      const response = await axios.get(baseUrl + params);
      result = response.data.map((element: any) => {
        const date = new Date(element.date_utc);
        const formattedDate = date.toLocaleDateString("en-CA");
        const data = {
          name: element.name,
          date: formattedDate,
          id: element.id,
          img: element.links.patch.small,
          details: element.details,
          success: element.success,
          youtubeLink: element.links.webcast,
          wikipedia: element.links.wikipedia,
          article: element.links.article,
          presskit: element.links.presskit,
        };
        return data;
      });
    } else if (params == "dragons") {
      const response = await axios.get(baseUrl + params);
      result = response.data.map((element: any) => {
        const date = new Date(element.date_utc);
        const formattedDate = date.toLocaleDateString("en-CA");
        const data = {
          name: element.name,
          id: element.id,
          type: element.type,
          img: element.flickr_images[0],
          active: element.active,
          details: element.description,
          wikipedia: element.wikipedia,
        };
        return data;
      });
    }
    return result.length > 50 ? result.slice(0, 50) : result;
  } catch (error) {
    throw error;
  }
};
