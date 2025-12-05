import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";


const CommonLayoutPage = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <PublicNavbar/>
             {children}
            <PublicFooter/>
        </div>
    );
};

export default CommonLayoutPage;