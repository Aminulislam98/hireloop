import { CompaniesTable } from "@/components/dashboard/CompaniesTable";
import { getCompanies } from "@/lib/api/companies";

const CompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <main className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold  sm:text-3xl">
          Company Registrations
        </h1>
        <p className=" max-w-2xl ">
          Review and manage company registration requests.
        </p>
      </header>

      {companies?.length > 0 ? (
        <CompaniesTable companies={companies} />
      ) : (
        <section className="rounded-lg border border-gray-200 bg-white px-4 py-16 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No companies yet
          </h2>
          <p className="mt-1 text-gray-600">
            New registration requests will appear here.
          </p>
        </section>
      )}
    </main>
  );
};

export default CompaniesPage;
