import { useState } from 'react';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import axios from 'axios';

export default function Index() {
  const [orgName, setOrgName] = useState(null);
  const [repoName, setRepoName] = useState(null);
  const [pkey, setPkey] = useState(null);
  const [contributoraward, setContributoraward] = useState(null);
  const [numawards, setNumawards] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');


  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(orgName, repoName, pkey);
    const res = await axios.post(`https://gitmony.herokuapp.com/registerOrg`, {
      "orgname": orgName,
      "reponame": repoName,
      "privatekey": pkey,
      "contributoraward": "1",
      "numawards": "1"
    })
    setIsLoading(false);
    setResult(res.data);
    console.log(res.data);
  }

  return (
    <>
      <Head>
        <title>Organisation Register</title>
      </Head>
      <Navbar />
      <main style={{ padding: "1vh" }}>
        <section className="projects_intro" id="intro">
          <h1> 📙 Register your Organisation 🌎</h1>
          <em>
            List the projects you want people to contribute.
          </em>
          <br />
          {
            result==='ok' && <em>
              <mark>🎊🎉 Organization registered success</mark> 
            </em>
          }
        </section>
        <form className="form-wrapper" onSubmit={register} >
          {
            isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              :
              <>
                <h3 className="text-light">Enter your ogranisation name</h3>
                <input
                  className="custom-file-input"
                  value={orgName}
                  placeholder="harmony-one"
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <h3 className="text-light">Enter your repo name</h3>
                <input
                  className="custom-file-input"
                  value={repoName}
                  placeholder="harmony"
                  onChange={(e) => setRepoName(e.target.value)}
                />
                <h3 className="text-light">Enter your private key</h3>
                <input
                  className="custom-file-input"
                  value={pkey}
                  placeholder="0x17f3a2d8e6504b1..."
                  onChange={(e) => setPkey(e.target.value)}
                />
                <h3 className="text-light">Doke coins to be rewarded per contribution ?</h3>
                <input
                  className="custom-file-input"
                  value={contributoraward}
                  type="number"
                  placeholder="1"
                  onChange={(e) => setContributoraward(e.target.value)}
                />
                <h3 className="text-light">How many people can claim it ?</h3>
                <input
                  className="custom-file-input"
                  value={numawards}
                  type="number"
                  placeholder="10"
                  onChange={(e) => setNumawards(e.target.value)}
                />
                <button className="create-course" type="submit">
                  Register
                </button>
              </>
          }
        </form>

        <hr className="break" />

      </main>
    </>
  )
}
