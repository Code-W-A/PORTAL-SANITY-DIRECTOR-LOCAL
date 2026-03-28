import { Highlight, Hits } from "react-instantsearch";
import Link from "next/link";

const Results = (props: any) => {
  const { setSearchModalOpen } = props;

  return (
    <div className="w-full">
      <Hits
        hitComponent={(props) => {
          return (
            <div
              key={props.hit.objectID}
              className="hover:bg-gray cursor-pointer px-4 py-3.5 duration-300 ease-in lg:px-7"
            >
              <Link
                onClick={() => setSearchModalOpen(false)}
                href={props?.hit?.objectID! || props?.hit?.url!}
              >
                <h6 className="text-dark mb-1.5 font-medium">
                  <Highlight attribute="title" hit={props?.hit} />
                </h6>
                <p className="text-body-color mt-2 line-clamp-2 text-sm leading-normal">
                  {props.hit?.content}
                </p>
              </Link>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Results;
