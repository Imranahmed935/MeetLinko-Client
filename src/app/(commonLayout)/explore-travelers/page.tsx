
import UserCard from "@/components/shared/UserCard";
import { exploreTravelers } from "@/services/user/exploreTravelers";
import { UserInfo } from "@/types/user.interface";

const ExploreTravelsPage = async () => {
  const travelers = await exploreTravelers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Travelers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelers.data.map((traveler: UserInfo) => (
          <UserCard key={traveler.id} traveler={traveler} />
        ))}
      </div>
    </div>
  );
};

export default ExploreTravelsPage;
