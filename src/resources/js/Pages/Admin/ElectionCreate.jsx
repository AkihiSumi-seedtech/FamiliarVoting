export default function ElectionCreate({ auth }) {
    return(   
    <AuthenticatedLayout
        user={auth.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
       
    </AuthenticatedLayout>
    )
}