import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { ethers, providers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createClient, STORAGE_KEY, authenticate as authenticateMutation, getChallenge, getDefaultProfile } from '../api'
import { parseJwt, refreshAuthToken } from '../utils'
import { AppContext } from '../context'
import Toolbar  from '../components/Toolbar'
import Modal from '../components/CreatePostModal'
import home from '../assets/home.svg'
import feed from '../assets/feed.svg'
import voyage from '../assets/voyage.svg'
import act from '../assets/act.svg'
import past from '../assets/past.svg'
import Image from 'next/image'
import NewPost from '../components/NewPost'

function MyApp({ Component, pageProps }) {
  const [connected, setConnected] = useState(true)
  const [userAddress, setUserAddress] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState()
  const router = useRouter()
  

  useEffect(() => {
    refreshAuthToken()
    async function checkConnection() {
      const provider = new ethers.providers.Web3Provider(
        (window).ethereum
      )
      const addresses = await provider.listAccounts();
      if (addresses.length) {
        setConnected(true)
        setUserAddress(addresses[0])
        getUserProfile(addresses[0])
      } else {
        setConnected(false)
      }
    }
    checkConnection()
    listenForRouteChangeEvents()
  }, [])

  async function getUserProfile(address) {
    try {
      const urqlClient = await createClient()
      const response = await urqlClient.query(getDefaultProfile, {
        address
      }).toPromise()
      setUserProfile(response.data.defaultProfile)
    } catch (err) {
      console.log('error fetching user profile...: ', err)
    }
  }

  async function listenForRouteChangeEvents() {
    router.events.on('routeChangeStart', () => {
      refreshAuthToken()
    })
  }

  async function signIn() {
    try {
      const accounts = await window.ethereum.send(
        "eth_requestAccounts"
      )
      setConnected(true)
      const account = accounts.result[0]
      setUserAddress(account)
      const urqlClient = await createClient()
      const response = await urqlClient.query(getChallenge, {
        address: account
      }).toPromise()
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const signature = await signer.signMessage(response.data.challenge.text)
      const authData = await urqlClient.mutation(authenticateMutation, {
        address: account, signature
      }).toPromise()
      const { accessToken, refreshToken } = authData.data.authenticate
      const accessTokenData = parseJwt(accessToken)
      getUserProfile(account)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        accessToken, refreshToken, exp: accessTokenData.exp
      }))
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <AppContext.Provider value={{
      userAddress,
      profile: userProfile
    }}>
      <div>
        <nav className="">
          
            <div className="bg-trip-900 fixed bottom-0 w-full grid grid-cols-5">
              <Link href='/'>
                <a className='imageBG'>
                  <Image
                    src={feed}
                    width={35}
                    height={35}
                    className="hover:regen-100 cursor-pointer"  
                  />
                </a>
              </Link>
              <Link href='/Wallettest'>
                <a className='imageBG'>
                  <Image
                    src={past}
                    width={35}
                    height={35}
                    className="hover:regen-100 cursor-pointer"
                  />  
                </a>
              </Link>
              <Link href='/'>
                <a className='imageBG'>
                  <Image
                    src={home}
                    width={35}
                    height={35}
                    className="hover:regen-100 cursor-pointer"
                  />
                 
                </a>
              </Link>
              <Link href='/profiles'>
                <a className='imageBG'>
                <Image
                  src={act}
                  width={35}
                  height={35}
                  className="hover:regen-100 cursor-pointer"
                />
                </a>
              </Link>
              {
                userProfile && (
                  <Link href={`/profile/${userProfile.id}`}>
                    <a className='imageBG'>
                      <Image
                        src={voyage}
                        width={35}
                        height={35}
                        className="hover:regen-100 cursor-pointer"
                      />
                    </a>
                  </Link>
                )
              }
            </div>

            <div className="">
              {
                !connected && (
                  <button className="bg-green-500 px-10 py-2 rounded-xl" onClick={signIn}>Sign in</button>
                )
              }
              {
                connected && (
                  <div
                    className=""
                    onClick={() => setIsModalOpen(true)}>
                    <img
                      src="/create-post.svg"
                      className=""
                    />
                  </div>
                )
              }
            </div>
        </nav>
        <div className="">
          <Component {...pageProps} />
        </div>
        {
          isModalOpen && (
            <Modal
              setIsModalOpen={setIsModalOpen}
            />
          )
        }
      </div>
    </AppContext.Provider>
  )
}


export default MyApp
