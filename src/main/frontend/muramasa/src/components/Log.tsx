function Log() {
    return (
        <div className="flex rounded-xl bg-darkocean p-4 gap-2 justify-around hover:bg-slate-800">
            <img src="https://i.pinimg.com/originals/4c/d8/a4/4cd8a4bfbabd0cc0f68e2db64a3e1db2.jpg" className="w-12 object-cover rounded-xl"/>
            <div className='flex flex-col w-full'>
                <div className="flex w-full justify-between">
                    <h2 className="font-medium text-md">Gumiya</h2>
                    <span className="text-[12px] text-slate-500">2023-02-23 17:23:21</span>
                </div>
                <p className="text-sm w-full truncate text-ellipsis">Completed spy x fmalyu.</p>
            </div>
        </div>
    )
}

export default Log;