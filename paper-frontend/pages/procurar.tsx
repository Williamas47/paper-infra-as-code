import React from "react";
import axios from "axios";
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
import { useRouter } from "next/router";
interface UsersContentProps {
  user: string;
  uploadedFilesLength: number;
  profileUrl: string;
}
interface SearchProfilesResponse {
  Prefix: string;
}

const Procurar = (): JSX.Element => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState<string>("");
  const [userResults, setUserResults] = React.useState<UsersContentProps[]>([]);
  const placeholderProfilePic =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  const handleSearch = async () => {
    const result = await axios.get(
      `${process.env.PROFILE_SEARCH_LAMBDA_URL}?search=${searchText}`
    );
    if (!result?.data?.usersContent.length) {
      return;
    }
    setUserResults(result.data.usersContent);
  };
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
            <ResultItem
              onClick={() => router.push(`/perfil/${user.user}`)}
              key={idx}
            >
              <ResultLeftSide>
                <img
                  height="75"
                  width="75"
                  src={user.profileUrl || placeholderProfilePic}
                  alt=""
                />
                <a>@{user.user}</a>
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
