import { useState } from 'react';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import axios from 'axios';

export default function Index() {
  const [orgName, setOrgName] = useState(null);
  const [repoName, setRepoName] = useState(null);
  const [hash, setHash] = useState(null);
  const [pkey, setPkey] = useState(null);
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(orgName, repoName, hash);
    const res = await axios.post(`https://gitmony.herokuapp.com/claimAward`, {
      "orgname": orgName,
      "reponame": repoName,
      "commithash": hash,
      "privatekey": pkey
    })
    setIsLoading(false);
    console.log(res.data);
    setLink(res.data);
  }

  return (
    <>
      <Head>
        <title>Claim Reward</title>
      </Head>
      <Navbar />
      <main style={{ padding: "1vh" }}>
        <section className="projects_intro" id="intro">
          <h1>🎊 Claim your Reward 🎉</h1>
          <em>
            Claim your crypto working.
          </em>
          <br />
          {
            link && <em>
              Track here {' '}
              <a className="thashLink" href={`https://kovan.etherscan.io/tx/${link}`} target="_blank">{`https://kovan.etherscan.io/tx/${link}`}</a>
            </em>
          }
        </section>
        <form className="form-wrapper" onSubmit={register}>
          {
            isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              :
              <><h3 className="text-light">Enter the ogranisation name</h3>
                <input
                  className="custom-file-input"
                  value={orgName}
                  placeholder="harmony-one"
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <h3 className="text-light">Enter the repo name</h3>
                <input
                  className="custom-file-input"
                  value={repoName}
                  placeholder="harmony"
                  onChange={(e) => setRepoName(e.target.value)}
                />
                <h3 className="text-light">Enter the commit hash</h3>
                <input
                  className="custom-file-input"
                  value={hash}
                  placeholder="0x17f3a2d8e6504b1..."
                  onChange={(e) => setHash(e.target.value)}
                />
                <h3 className="text-light">Enter your private key</h3>
                <input
                  className="custom-file-input"
                  value={pkey}
                  placeholder="0x17f3a2d8e6504b1..."
                  onChange={(e) => setPkey(e.target.value)}
                />
                <button className="create-course" type="submit">
                  Claim
              </button>
              </>
          }

        </form>

        <hr className="break" />

      </main>
    </>
  )
}
