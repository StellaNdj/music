import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { newReleases } from "../Api";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [newReleasesData, setNewReleasesData] = useState();

  useEffect(() => {
    const fetchNewReleases = async () => {
      const response = await newReleases({token});
      if (response) {
        console.log(response);
        setNewReleasesData(response);
      }
    };
    fetchNewReleases();
  }, [token])

  return (
    <>
      <h1>Music Discovery App</h1>
      {token}
    </>
  )
}

export default Home;
