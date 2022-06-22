import { Context, APIGatewayProxyResultV2 } from "aws-lambda";
import * as sdk from "aws-sdk";
import { CommonPrefix } from "aws-sdk/clients/s3";

const s3 = new sdk.S3();

const bucketName: string = process.env.UPLOADS_BUCKET as string;

interface EventProps {
  search: string;
  queryStringParameters: { search: string };
}

interface UsersContentProps {
  user: string | null;
  uploadedFilesLength: number;
  profileUrl: string;
}

export const handler = async (
  event: EventProps,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const query = event.queryStringParameters;

    const { search } = query;
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
        .filter((el) => el)
    );

    console.log("received users", matchingFolders);

    if (!matchingFolders?.length) throw new Error("no Matching users received");

    const usersContent: UsersContentProps[] = await Promise.all(
      matchingFolders.map(async (user) => {
        const params = {
          Bucket: process.env.UPLOADS_BUCKET as string,
          Delimiter: "/",
          Prefix: user as string,
        };

        const result = await s3.listObjects(params).promise();
        if (!result?.Contents?.length)
          throw new Error(`No data found for user: ${user}`);

        return {
          user: user,
          uploadedFilesLength:
            result.Contents?.filter((item) => item.Key !== `${user}/profile`)
              .length || 0,
          profileUrl: `${process.env.S3_BASE_URL}/${user}/profile`,
        };
      })
    );

    console.log("usersContent", usersContent);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success on dataSeed function",
        matchingFolders,
      }),
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error on searchMathingProfiles function",
        error: err,
      }),
    };
  }
};
