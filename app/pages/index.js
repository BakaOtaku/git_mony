import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'
import Image from 'next/image'

export default function Index() {
  return (
    <>
      <Head>
        <title>Gitmony · Open Source</title>
      </Head>
      <Navbar />
      <main style={{ padding: "1vh" }}>
        <div className="heading">
          <div className="left_sec">
            <Image
              src="/logo.png"
              alt="Aman"
              width={250}
              height={250}
              className="my_img"
              draggable="false"
            />
            <div className="profile_badge">
              💰
            </div>
          </div>
          <div className="right_sec">
            <h2 className="title">
              Gitmony
              <br />
              <span id="blue_text">Make open source sustainable</span>
            </h2>
            <br />
            <h2 className="description">
              We think enthusiastic open source developers are not appropriately rewarded
            </h2>
          </div>
        </div>
        {/*<hr className="break" />*/}
        <section className="semi" data-sr-id="0" >
          <div className="semi_title">Why Gitmony</div>
          <div className="semi_desc">
            <p>
              GitMony uses <strong>Harmony Bridge</strong> and <strong>Chainlink oracle</strong>, to make completely decentralized platform to reward opensource contributors.
              This is the issue-based bounty platform for open source projects.
            </p>
            <p>
              GitMony is a truly decentralized platform to reward this and uses Chainlink and Harmony to verify the contributions on Github.
              The organization will have to register on the smart-contract and its HRC20 coins named (Doke Coin) will be deposited into the contract.
              Now a contributor will commit on the organisation’s repo and also prefix his public key to the commit message.
            </p>
            <p>
              Then the contributor will have to call the smart contract from his wallet and provide the info of his repo to which he has committed and also the commit hash.
              Now chainlink will verify the commit from github and if the wallet address on the commit message and the smart-contract caller’s address match then the HRC20 tokens will be transferred to the sender to reward the contributor.
            </p>
          </div>
        </section>

        <hr className="break" />

      </main>
      <Footer />
    </>
  )
}
