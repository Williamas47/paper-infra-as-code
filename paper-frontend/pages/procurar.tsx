import React from "react";
import { Image as ImageIcon, Search } from "@material-ui/icons";
import {
  SearchSection,
  SearchTextField,
  SearchIconButton,
  ResultsSection,
  ResultItem,
  ResultLeftSide,
  ResultRightSide,
} from "./procurar.styles";
import { fetchUsersData, SearchProfiles } from "./api/lambdaContent";
import * as AWS from "aws-sdk";
import { CommonPrefix } from "aws-sdk/clients/s3";

interface SearchProfilesResponse {
  Prefix: string;
}
const Procurar = (): JSX.Element => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [userResults, setUserResults] = React.useState([]);
  const handleSearch = async () => {
    const result = await SearchProfiles(searchText);
    console.log('result', result);
     fetchUsersData(result as string[]);
    // if (!result.length) return;

    // setUserResults(result);
  };
  console.log("userResults", userResults);
  return (
    <div style={{ overflowY: "scroll" }}>
      <SearchSection>
        <SearchTextField
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          placeholder="Procurar por perfis"
        />
        <SearchIconButton onClick={handleSearch}>
          <Search fill="#E9EAEC !important" />
        </SearchIconButton>
      </SearchSection>
      <ResultsSection>
        {userResults?.length > 0 &&
          userResults.map((user, idx) => (
            <ResultItem key={idx}>
              <ResultLeftSide>
                <img src="https://via.placeholder.com/75" alt="" />
                <p>@{user}</p>
              </ResultLeftSide>
              <ResultRightSide>
                <ImageIcon />
                <p>8</p>
              </ResultRightSide>
            </ResultItem>
          ))}
        {/* <ResultItem>
          <ResultLeftSide>
            <img src="https://via.placeholder.com/75" alt="" />
            <p>@random_username</p>
          </ResultLeftSide>
          <ResultRightSide>
            <ImageIcon />
            <p>8</p>
          </ResultRightSide>
        </ResultItem>
        <ResultItem>
          <ResultLeftSide>
            <img src="https://via.placeholder.com/75" alt="" />
            <p>@random_username</p>
          </ResultLeftSide>
          <ResultRightSide>
            <ImageIcon />
            <p>2</p>
          </ResultRightSide>
        </ResultItem>
        <ResultItem>
          <ResultLeftSide>
            <img src="https://via.placeholder.com/75" alt="" />
            <p>@random_username</p>
          </ResultLeftSide>
          <ResultRightSide>
            <ImageIcon />
            <p>6</p>
          </ResultRightSide>
        </ResultItem>
        <ResultItem>
          <ResultLeftSide>
            <img src="https://via.placeholder.com/75" alt="" />
            <p>@random_username</p>
          </ResultLeftSide>
          <ResultRightSide>
            <ImageIcon />
            <p>0</p>
          </ResultRightSide>
        </ResultItem> */}
      </ResultsSection>
    </div>
  );
};

export default Procurar;
