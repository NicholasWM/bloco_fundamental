import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import api, {baseURL} from '../../services/api'
import Code from "./code";
// import './global.css'

function HomePage() {
  const [markdownURL, setMarkdownURL] = useState("/README.md")
  const [markdown, setMarkdown] = useState("")
  useEffect(()=>{
    api.get(markdownURL)
    .then(({data}:any)=> {
      setMarkdown(markdown !== undefined? data:"# Nao encontrado")
    })
  }
  ,[markdownURL])

  useEffect(()=>{
    let links = document.getElementsByTagName('a')
    console.log(links)
    if(links.length > 0){
      for (let index = 0; index < links.length; index++) {
        links[index].onclick = (e) => {
          e.preventDefault();
          const finalURI = links[index].pathname.replace('/markdown/', "")
          
          console.log("finalURI -> ",finalURI)
          setMarkdownURL(finalURI)
        }
        
      }
    }
  },[markdown])
  const uriHrefA =  (uri: string, typeFile:string) => {
    function removeMdFiles(uri: [string]) {
      return uri.filter(element => !element.includes(typeFile)).join('/')
    }
    function countFoldersAbove(uri: string) {
      return uri.split('/').reduce((acumulator, value)=> {
        if(value === '..'){
          acumulator++
        }
        return acumulator
      },0)
    }
    function removeBlank(uri:[string]) {
      return uri.filter(item => item !=='')
    }
    function splitURIinArray(uri:string): any {
      return uri.split('/')
    }
    // Busca ../ e conta quantas pastar tem que subir
    const foldersAbove = countFoldersAbove(uri)
    
    // Formata a URI e retira o arquivo.md
    const uriFormated = removeMdFiles(splitURIinArray(uri))
    
    //Formata o path atual e remove vazios
    let actualPath :any = splitURIinArray(markdownURL)
    actualPath = removeBlank(actualPath)
    
    // De acordo com a quantidade de pastas para subir
    // Elimina os items mais abaixo até chegar na pasta acima
    for (let index = 0; index <= foldersAbove; index++) {
      actualPath.pop()
    }
    actualPath = actualPath.join('/')

    let pathToJoin = uri.substring(uri.lastIndexOf("../") +1).replace('./', '/')
    if(pathToJoin[0] !== '/'){ 
      pathToJoin = `/${pathToJoin}`
    }

    const finalPath = `${actualPath}${pathToJoin}` 
    
    return finalPath
  }
  
  return (
    <div>
      <h1>Bloco Fundamental</h1>
      <h2>Path Selecionado: {markdownURL}</h2>
      <ReactMarkdown 
        escapeHtml={false}
        renderers={{code: Code}}
        transformImageUri={(uri) => `${baseURL}/${uriHrefA(uri,'.md')}`}
        transformLinkUri={(uri) => `/markdown/${uriHrefA(uri,'.md')}`}
        source={markdown}
      />
    </div>
  );
}
export default HomePage;
