import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import api, {baseURL} from '../../services/api'
// import CodeBlock from "./CodeBlock";
// import './global.css'


function HomePage(props) {
  // const [markdownURL, setMarkdownURL] = useState(String(props.location.pathname.split('/').filter((value, index) => index > 1).join('/')))
  const [markdownURL, setMarkdownURL] = useState("/README.md")
  const [markdown, setMarkdown] = useState("")
  useEffect(()=>{
    api.get(markdownURL)
    .then(({data})=> setMarkdown(data))
  }
  ,[markdownURL])

  useEffect(()=>{
    let links = document.getElementsByTagName('a')
    console.log(links)
    if(links.length > 0){

      console.log(links[0].onclick)
      for (let index = 0; index < links.length; index++) {
        links[index].onclick = (e) => {
          e.preventDefault();
          const finalURI = () => {
            const lastRoute = markdownURL.split('/')
            return `${links[index].pathname.replace('markdown/',`${lastRoute[lastRoute.length-2]}/`)}`
          }
          console.log(finalURI())
          setMarkdownURL(finalURI())
        }
        
      }
    }
  },[markdown])
  const uriHrefA =  (uri,typeFile) => {
    function removeMdFiles(uri) {
      return uri.filter(element => !element.includes(typeFile)).join('/')
    }
    function countFoldersAbove(uri) {
      return uri.split('/').reduce((acumulator, value)=> {
        if(value === '..'){
          acumulator++
        }
        return acumulator
      },0)
    }
    function removeBlank(uri) {
      return uri.filter(item => item !=='')
    }
    function splitURIinArray(uri) {
      return uri.split('/')
    }
    // Busca ../ e conta quantas pastar tem que subir
    const foldersAbove = countFoldersAbove(uri)
    // console.log("foldersAbove -> ",foldersAbove)

    // Formata a URI e retira o arquivo.md
    const uriFormated = removeMdFiles(splitURIinArray(uri))
    // console.log(`uriFormated -> ${uriFormated}`);
    
    //Formata o path atual e remove vazios
    let actualPath = splitURIinArray(markdownURL)
    actualPath = removeBlank(actualPath)
    // console.log("actualPath -> " ,actualPath);
    
    // De acordo com a quantidade de pastas para subir
    // Elimina os items mais abaixo até chegar na pasta acima
    for (let index = 0; index <= foldersAbove; index++) {
      // console.log('Eliminando')
      actualPath.pop()
    }
    actualPath = actualPath.join('/')
    // console.log("actualPath -> ",actualPath)

    let pathToJoin = uri.substring(uri.lastIndexOf("../") +1).replace('./', '/')
    if(pathToJoin[0] !== '/'){ 
      pathToJoin = `/${pathToJoin}`
    }
    // console.log("pathToJoin -> ",pathToJoin);

    const finalPath = `${actualPath}${pathToJoin}` 
    // console.log("finalPath -> ",finalPath);
    
    return finalPath
  }
  
  return (
    <div>
    <h1>{markdownURL}</h1>
      <h1>Markdown Component</h1>
      <ReactMarkdown 
        transformImageUri={(uri) => `${baseURL}/${uriHrefA(uri,'.md')}`}
        // transformLinkUri={(uri) => `/markdown/${uriHrefA(uri,'.md')}`}
        source={markdown}
      />
    </div>
  );
}
export default HomePage;
