import { Context, APIGatewayProxyResultV2 } from "aws-lambda";
import * as sdk from "aws-sdk";
import { CommonPrefix } from "aws-sdk/clients/s3";

const s3 = new sdk.S3();

const bucketName: string = process.env.UPLOADS_BUCKET as string;

interface EventProps {
  search: string;
}
export const handler = async (
  event: EventProps,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { search } = event;
    if (!search) throw new Error("No search query provided!");
    const allFolders = await s3.listObjectsV2({ Bucket: bucketName }).promise();

    if (!allFolders.CommonPrefixes?.length) {
      throw new Error("No folders found!");
    }
    const matchingFolders = await Promise.all(
      allFolders.CommonPrefixes.map((item: CommonPrefix) =>
        item?.Prefix ? item.Prefix : null
      )
        .filter((el) => el?.match(search))
        .map((item) => item)
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success on dataSeed function",
        matchingFolders,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error on searchMathingProfiles function",
        error: err,
      }),
    };
  }
};
