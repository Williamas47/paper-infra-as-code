import * as AWS from "aws-sdk";
import { CommonPrefix, ListObjectsV2Output } from "aws-sdk/clients/s3";

export const SearchProfiles = async (search: string) => {
  console.log("called");
  console.log("search on function: ", search);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3params = {
    Bucket: process.env.UPLOADS_BUCKET as string,
    // MaxKeys: 20,
    Delimiter: "/",
  };
  const returnData: string[] = [];
  const result = await s3
    .listObjectsV2(s3params)
    // , (err, data) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     if (!data.CommonPrefixes?.length) {
    //       return;
    //     }
    //     console.log(data);
    //     console.log("returnData", returnData);
    //     const matchingUsers = data.CommonPrefixes.map((item) =>
    //       item.Prefix ? item.Prefix.slice(0, -1) : null
    //     )
    //       .filter((el) => el?.match(search))
    //       .filter((el) => el !== null)
    //       .map((item) => returnData.push(item as string));
    //     console.log("matchingUsers", matchingUsers);
    //     console.log("returnData", returnData);
    //     // if (matchingUsers?.length > 0 && matchingUsers !== null) {
    //     //   returnData.push([...matchingUsers]);
    //     // }
    //   }
    //   // STEP FUNCTION, FIND FOLDERS -> GET CONTENT OF FOLDER, IMG COUND & PROFILE URL -> SEND BACK ALL ARRAY
    // })
    .promise();
    
    if (!result.CommonPrefixes?.length) {
      throw new Error("No folders found!");
    }
    const matchingFolders = result.CommonPrefixes.map(
      (item: CommonPrefix) => (item?.Prefix ? item.Prefix : null)
    )
      .filter((el) => el?.match(search)) 
      .map((item) => item );
    console.log('list obj result', matchingFolders);
  return matchingFolders;
};
interface UsersContentProps {
  user: string;
  uploadedFilesLength: number;
  profileUrl: string;
}
export const fetchUsersData = async (users: string[]) => {
  console.log("received users", users);

  if (!users?.length) return;

  const usersContent: UsersContentProps[] = [];
  await users.forEach(async(user) => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.UPLOADS_BUCKET },
      signatureVersion: "v4",
    });
    const params = {
      Bucket: process.env.UPLOADS_BUCKET as string,
      Delimiter: "/",
      Prefix: user,
    };
    console.log('user!!', user)
    const thisResult = await s3
      .listObjects(
        params,
        // (err: AWS.AWSError, data: AWS.S3.Types.ListObjectsOutput) => {
        //   console.log("foundUserData", data);
        //   const userData = {
        //     user: user,
        //     uploadedFilesLength:
        //       data.Contents?.filter((item) => item.Key !== `${user}/profile`)
        //         .length || 0,
        //     profileUrl: `${process.env.S3_BASE_URL}/${user}/profile`,
        //   };
        //   console.log("userData", userData);
        //   usersContent.push(userData);
        // }
      )
      .promise();
      console.log('the result I want', thisResult);
  });
  console.log(usersContent);
};
