import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/header";
import Item from "../item/item";
import "./main.css"
const Main = ()=> {
    const [previous, setPrevious] = useState([]);
    const [trending, setTrending] = useState([]);
    useEffect(()=> {
        axios.get('http://localhost:1337/api/previouss?populate=*').then((previous)=> {
            setPrevious(previous.data.data)
        }).catch(()=> {

        }).finally(()=> {

        });
        axios.get('http://localhost:1337/api/trendings?populate=*').then((trending)=> {
            setTrending(trending.data.data)
        }).catch(()=> {

        }).finally(()=> {

        });
    }, [])
    return (
        <>
            <Header/>
            <section>
                <article className="trend">Trending</article>
              <section className="cardcont"> {trending.map((item, key)=> {
                    return <Item item={item.attributes} />
                })}</section> 
                <article className="trend">People also like this</article>
                {previous.map((item, key)=> {
                    return <Item item={item.attributes}/>
                })}
            </section>
        </>
    )
}
export default Main