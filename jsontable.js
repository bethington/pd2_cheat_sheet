document.addEventListener("DOMContentLoaded", ()=>{
    let jsonstr=`[
      {"id":"2", "first_name":"Sam","last_name":"Smith", "phone":"111-222-3333","email":"ssmith@yahoo.com","address":"33 Birch Rd","city":"Miami","state":"FL"},
      {"id":"3", "first_name":"Brad","last_name":"Traversy", "phone":"211-322-4333","email":"brad@test.com","address":"222 South St","city":"Portland","state":"FL"}
    ]`
    let jsonobj=JSON.parse(jsonstr)
    let form=document.querySelector("form")
    form.string.addEventListener("click", ()=>{
        let out=form.out
        if(!jsonobj.length)
          return
        let tblstr="<table>"
        tblstr+="<caption>Table Using HTML String</caption>"
        tblstr+="<tr>"
        for(let prop in jsonobj[0]) {
          tblstr+=`<th>${prop}`
        }
        tblstr+=jsonobj.reduce((s, x) => {
          s+="<tr>"
          for(let prop in x) {
            s+=`<td>${x[prop]}`
          }
          return s
        }, "")
        tblstr+="</table>"
        out.insertAdjacentHTML("beforeend", "<p>" + tblstr)
      })
      form.dom.addEventListener("click", ()=>{
        let out=form.out
        if(!jsonobj.length)
          return
        let tbl=document.createElement("table")
        tbl.createCaption().innerText="Table Using DOM API"
        let hdr=tbl.insertRow()
        for(let prop in jsonobj[0]) {
          hdr.appendChild(document.createElement("th")).innerText=prop
        }
        jsonobj.reduce((t, x) => {
          let row=t.insertRow()
          for(let prop in x) {
            row.insertCell().innerText=x[prop]
          }
          return t
        }, tbl)
        out.appendChild(document.createElement("p"))
        out.appendChild(tbl)
      })
      form.clear.addEventListener("click", ()=>form.out.innerHTML="")
})