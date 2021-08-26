const form = document.forms[0]
const siteTitle = document.getElementById('site-title')
const siteLink = document.getElementById('site-link')

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const title = siteTitle.value;
    const url = siteLink.value;

    if(!title || !url){
        console.log("Enter the form")
        return false
    }
    var bookmark = {
        name: title,
        siteUrl : url
    }

    if(localStorage.getItem('bookmarks') === null){
        // Init array 
        var bookmarks = []
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }else{
        var getBookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        getBookmarks.push(bookmark)

        // re set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(getBookmarks))
    }


    document.forms[0].reset()

    fetchTheLocalStorage()

})



function fetchTheLocalStorage(){
    var fecthBookMarks = JSON.parse(localStorage.getItem('bookmarks'))
    const showBookMarks = document.querySelector('.links')
    var bookmark = ''
    for(i=0; i<fecthBookMarks.length; i++){
        bookmark += `
        
            <div class="bookmark-box">
                <h1>${fecthBookMarks[i].name}</h1>
                <a href="${fecthBookMarks[i].siteUrl}"><button>Visit</button></a> <button class="btn-delete">Remove</button>
            </div>

        `
        showBookMarks.innerHTML = bookmark;
    }

    const btnDelete = document.querySelectorAll('.btn-delete')
    btnDelete.forEach((each) =>{
        each.addEventListener("click", (e) =>{
            var bookmark = JSON.parse(localStorage.getItem('bookmarks'))
            for(i=0; i<bookmark.length; i++){
                if(bookmark[i].siteUrl == fecthBookMarks[i].siteUrl){
                    bookmark.splice(i, 1);
                }
            }
            
            localStorage.setItem('bookmarks', JSON.stringify(bookmark))

            fetchTheLocalStorage()
        })
    })
}

