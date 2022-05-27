const linkList = [
    {
        url:"/",
        title:"Home"
    },
    {
        url:'/book',
        title:"Book"
    },
    {
        url:"/book/add",
        title:"Add book"
    },
    {
        url:"/author",
        title:"Author"
    },
    {
        url:"/author/add",
        title:"Add author"
    }
]

const Navbar = () => {
    return (
        <nav className={"w-full flex items-center py-7"}>
            <h2 class={"text-blue-400 font-bold text-3xl cursor-pointer"}>
                <a href="/">BookBary</a>
            </h2>
            <ul className={"flex items-center mt-2 ml-14"}>
                {linkList.map((link, id) => {
                    return (
                        <li className={"mr-3"} key={id}>
                            <a className={'text-blue-200 font-medium'} href={link.url}>{link.title}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navbar;