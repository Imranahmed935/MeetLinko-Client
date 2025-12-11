import AddComment from "@/components/AddComment";
import ReviewCard from "@/components/shared/ReviewCard";
import { formatDateTime } from "@/lib/formatters";
import { getSingleTravelById } from "@/services/user/travelBuddy";
import { TReview } from "@/types/review.interface";
import Image from "next/image";

const FindBuddyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const travelerDetails = await getSingleTravelById(id);
  const details = travelerDetails.data.data;
  const { host, participants } = details;

  const defaultProfileImage = "https://via.placeholder.com/150";
  const isHost = false;
  const actionButtonText = isHost ? "Manage Trip" : "Request to Join";

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl bg-gray-50 min-h-screen">
      <header className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          {details.title}
        </h1>
        <p className="text-2xl text-gray-700 mb-4">
          Destination:{" "}
          <span className="font-semibold text-gray-900">
            {details.destination}
          </span>
        </p>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="text-lg text-gray-600 space-y-1">
            <p>🗓️ **Start:** {formatDateTime(details.startDate)}</p>
            <p>🗓️ **End:** {formatDateTime(details.endDate)}</p>
          </div>

          <button className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
            {actionButtonText}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
              Description
            </h2>
            <p className="text-gray-700 italic">
              {details.description ||
                "The host did not provide a detailed description."}
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Trip Facts
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li>
                **Budget:**{" "}
                <span className="font-bold text-green-600">
                  ${details.budget}
                </span>
              </li>
              <li>
                **Travel Type:**{" "}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {details.travelType}
                </span>
              </li>
              <li>
                **Visibility:** {details.visibility ? "Public" : "Private"}
              </li>
              <li>**Participants:** {participants.length} currently joined</li>
              <li>**Reviews:** {details.reviews.length} total reviews</li>
            </ul>
            <div className="space-y-4">
              <h1>Reviews by participants</h1>
              {details.reviews.map((review: TReview, idx: number) => (
                <ReviewCard
                  key={review.id || idx} 
                  review={review}
                />
              ))}
            </div>
            <div className="mt-10">
            <AddComment details={details}/>
          </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Trip Host
            </h2>

            <div className="flex flex-col items-center text-center space-y-4">
              <Image
                src={host.profileImage || defaultProfileImage}
                alt={`Profile image of ${host.fullName}`}
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-indigo-500"
              />

              <h3 className="text-xl font-semibold text-gray-900">
                {host.fullName}
              </h3>
              <p className="text-sm text-gray-600 italic">
                {host.bio || "No bio provided."}
              </p>

              <hr className="w-full border-t border-gray-200" />

              <ul className="text-left w-full space-y-2 text-gray-700">
                <li>
                  📧 **Email:**{" "}
                  <a
                    href={`mailto:${host.email}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {host.email}
                  </a>
                </li>
                <li>📍 **Location:** {host.currentLocation || "N/A"}</li>
                <li>
                  ✨ **Interests:**{" "}
                  {host.travelInterests?.length > 0
                    ? host.travelInterests.slice(0, 2).join(", ") + "..."
                    : "None"}
                </li>
                <li>✅ **Verified:** {host.verified ? "Yes" : "No"}</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FindBuddyDetailsPage;
