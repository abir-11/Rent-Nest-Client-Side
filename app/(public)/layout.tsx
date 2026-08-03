import Footer from '@/components/shared/footer/page';
import { Navbar } from '@/components/shared/navbar/page';
import { getMe } from '@/service/getMe'
import React from 'react'

const PublicLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {


    const user = await getMe();
    return (
        <div>
            <Navbar user={user}></Navbar>
            
            {children}
            <Footer></Footer>
        </div>
    )
}

export default PublicLayout