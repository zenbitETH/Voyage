import { useState, useEffect, useContext } from 'react'
import { createClient, basicClient, searchPublications, explorePublications, timeline } from '../api'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { trimString, generateRandomColor } from '../utils'
import { Button, SearchInput, Placeholders } from '../components'
import { AppContext } from '../context'
import Link from 'next/link'
import Image from 'next/image';
import { getGraph } from '../api/the-graph'

import like from '../assets/1-like.svg'
import tripComment from '../assets/2-commet.svg'
import mirror from '../assets/3-mirror.svg'
import collect from '../assets/4-collect.svg'
import WDC from '../assets/worldcoin.svg'

const typeMap = {
  Comment: "Comment",
  Mirror: "Mirror",
  Post: "Post"
}

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loadingState, setLoadingState] = useState('loading')
  const [searchString, setSearchString] = useState('')
  const { profile } = useContext(AppContext)

  useEffect(() => {
    fetchPosts() 
  }, [profile])

  async function fetchPosts() {
    const provider = new ethers.providers.Web3Provider(
      (window).ethereum
    )
    const addresses = await provider.listAccounts();
    console.log('addresses: ', addresses)
    if (profile) {
      try {
        const client = await createClient()
        const response = await client.query(timeline, {
          profileId: profile.id, limit: 15
        }).toPromise()
        const posts = response.data.timeline.items.filter(post => {
          if (post.profile) {
            post.backgroundColor = generateRandomColor()
            return post
          }
        })
        setPosts(posts)
        setLoadingState('loaded')
      } catch (error) {
        console.log({ error })
      }
    } else if (!addresses.length) {
      try {
        const response = await basicClient.query(explorePublications).toPromise()
        console.log(response)
        const posts = response.data.explorePublications.items.filter(post => {
          if (post.profile) {
            post.backgroundColor = generateRandomColor()
            return post
          }
        })
        setPosts(posts)
        setLoadingState('loaded')
      } catch (error) {
        console.log({ error })
      }
    }
  }

  async function searchForPost() {
    setLoadingState('')
    try {
      const urqlClient = await createClient()
      const response = await urqlClient.query(searchPublications, {
        query: searchString, type: 'PUBLICATION'
      }).toPromise()
      const postData = response.data.search.items.filter(post => {
        if (post.profile) {
          post.backgroundColor = generateRandomColor()
          return post
        }
      })
  
      setPosts(postData)
      if (!postData.length) {
        setLoadingState('no-results')
      }
    } catch (error) {
      console.log({ error })
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      searchForPost()
    }
  }

  return (
    <div>

      <div className={listItemContainerStyle}>
        {
          loadingState === 'no-results' && (
            <h2>No results....</h2>
          )
        }
        {
           loadingState === 'loading' && <Placeholders number={6} />
        }
        {
          posts.map((post, index) => (
            <Link href={`/profile/${post.profile.id || post.profile.profileId}`} key={index}>
              <a>
                <div className="items">
                  
                  <div className="postHead" >
                    
                    {
                      post.profile.picture && post.profile.picture.original ? (
                      
                        <img src={post.profile.picture.original.url} className={profileImageStyle} />
                      
          
                      ) : (
                        <div
                          className={
                            css`
                            ${placeholderStyle};
                            background-color: ${post.backgroundColor};
                            `
                          }
                        />
                      )
                    }
                    <div className="postText">
                      <div className="proName">{post.profile.name} /    
                        <span className="proHandle">{post.profile.handle}</span>  
                      </div>

                      {console.log(getGraph(post.profile.ownedBy))}
                      <div className='tripCity'>{getGraph(post.profile.ownedBy)?"📍{getGraph(post.profile.ownedBy)}, Trip #0001":"No Trip NFT Minted"}</div>
                     
                    </div>
                    <div >
                    {console.log(post.profile,      "===================================")}
                      <p className='WDC'> {}  :


                        <div>{post.profile.onChainIdentity.worldcoin.   isHuman.toString(
                        <Image
                          src={WDC}
                          width={20}
                          height={20}
                          className="hover:regen-100 cursor-pointer "  
                        />)}
                        
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className='postContent'>
                    <p>{trimString(post.metadata.content, 200)}</p>
                    {}
                    <div className='mt-5'>
                      <img src={post.metadata.image} />
                    </div>
                    {console.log("proName",post.metadata, 200)}
                    <div className='proFooter'>
                    <Link href='/'>
                      <a className=''>
                        <Image
                          src={like}
                          width={20}
                          height={20}
                          className="hover:regen-100 cursor-pointer z-0 "  
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a className=''>
                        <Image
                          src={tripComment}
                          width={20}
                          height={20}
                          className="hover:regen-100 cursor-pointer"  
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a className=''>
                        <Image
                          src={mirror}
                          width={20}
                          height={20}
                          className="hover:regen-100 cursor-pointer"  
                        />
                      </a>
                    </Link>
                    <Link href='/'>
                      <a className=''>
                        <Image
                          src={collect}
                          width={20}
                          height={20}
                          className="hover:regen-100 cursor-pointer"  
                        />
                      </a>
                    </Link>
                    </div>
                    
                    {/*<Image       
                      width="100px"
                      height="auto" 
                      src={post.metadata.image}class="PLDetail" />*/}
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

const searchContainerStyle = css`
  padding: 40px 0px 30px;
  
`

const latestPostStyle = css`
  margin: 23px 5px 5px;
  word-wrap: break-word;
`

const profileContainerStyle = css`
  display: flex;
  flex-direction: row;
 
`

const profileImageStyle = css`
  width: 42px;
  height: 42px;
  border-radius: 34px;
  margin:15px
  
`

const placeholderStyle = css`
  ${profileImageStyle};
`

const listItemContainerStyle = css`
  display: flex;
  flex-direction: column;
`

const listItemStyle = css`
  background-color: white;
  margin-top: 13px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, .15);
  padding: 21px;
`

const profileInfoStyle = css`
  margin-left: 10px;
`

const nameStyle = css`
  margin: 0 0px 5px;
`

const handleStyle = css`
  margin: 0px 0px 5px;
  color: #416657;
`

const itemTypeStyle = css`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: #f0f3e9
  margin-bottom: 16px;
`