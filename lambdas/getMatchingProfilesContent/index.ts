import { Context, APIGatewayProxyResultV2 } from "aws-lambda";
import * as sdk from "aws-sdk";

const s3 = new sdk.S3();

interface EventProps {
  message: string;
  matchingFolders: string[];
}

interface UsersContentProps {
  user: string;
  uploadedFilesLength: number;
  profileUrl: string;
}

export const handler = async (
  event: EventProps,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  try {
    const { matchingFolders } = event;
    console.log("received users", matchingFolders);

    if (!matchingFolders?.length) throw new Error("no Matching users received");

    // const usersContent: UsersContentProps[] = [];
    // for await (const user of matchingFolders){
    const usersContent: UsersContentProps[] = await Promise.all(
      matchingFolders.map(async (user) => {
        const params = {
          Bucket: process.env.UPLOADS_BUCKET as string,
          Delimiter: "/",
          Prefix: user,
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
    console.log(usersContent);
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error on getMatchingProfilesContent function",
        error: err,
      }),
    };
  }
};
