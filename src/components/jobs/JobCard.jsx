// JobCard.jsx — HeroUI v2 compatible
// Install: npm install @heroui/react framer-motion

import { Card, CardBody, Chip, Button, Avatar } from "@heroui/react";
import {
  Bookmark,
  DollarSign,
  Clock,
  Flame,
  Wifi,
  Building2,
  Star,
} from "lucide-react";

function formatSalary(min, max, currency) {
  const fmt = (n) => {
    const num = Number(n);
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
  };
  return `${currency} ${fmt(min)} – ${fmt(max)}`;
}

function formatDeadline(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTypeBadge(type) {
  const map = {
    "full-time": { label: "Full-time", color: "default" },
    "part-time": { label: "Part-time", color: "default" },
    contract: { label: "Contract", color: "default" },
    internship: { label: "Internship", color: "default" },
  };
  return map[type] || { label: type, color: "default" };
}

export default function JobCard({
  job,
  isActive = false,
  onSelect,
  onBookmark,
}) {
  const {
    title,
    type,
    salaryMin,
    salaryMax,
    currency,
    deadline,
    city,
    country,
    isRemote,
    status,
    companyName,
    companyLogo,
    category,
    isHot,
    easyApply,
  } = job;

  const typeBadge = getTypeBadge(type);

  return (
    <Card
      isPressable
      onPress={() => onSelect?.(job)}
      className={`w-full transition-all duration-150 ${
        isActive
          ? "border-2 border-blue-400 shadow-sm"
          : "border border-default-200 hover:border-default-400"
      }`}
      shadow="none"
      radius="lg"
    >
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          {/* Company logo */}
          <Avatar
            src={companyLogo}
            name={companyName?.slice(0, 2).toUpperCase()}
            radius="md"
            size="md"
            className="flex-shrink-0 bg-default-100 border border-default-200"
            imgProps={{ className: "object-contain p-1" }}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground leading-tight truncate">
                {title}
              </h3>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                aria-label="Bookmark job"
                onPress={() => onBookmark?.(job)}
                className="flex-shrink-0 -mt-0.5 text-default-400 hover:text-foreground"
              >
                <Bookmark size={16} />
              </Button>
            </div>

            {/* Company & location */}
            <p className="text-xs text-default-500 mt-0.5 mb-2.5">
              {companyName}
              {(city || country) && (
                <>
                  <span className="mx-1 text-default-300">•</span>
                  {city}
                  {city && country && ", "}
                  {country}
                  {isRemote && (
                    <>
                      <span className="mx-1 text-default-300">•</span>
                      Remote
                    </>
                  )}
                </>
              )}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {/* Salary */}
              <Chip
                size="sm"
                variant="flat"
                color="default"
                startContent={<DollarSign size={11} />}
                classNames={{ base: "text-xs h-6", content: "px-1" }}
              >
                {formatSalary(salaryMin, salaryMax, currency)}
              </Chip>

              {/* Type */}
              <Chip
                size="sm"
                variant="flat"
                color="default"
                startContent={<Clock size={11} />}
                classNames={{ base: "text-xs h-6", content: "px-1" }}
              >
                {typeBadge.label}
              </Chip>

              {/* Remote */}
              {isRemote && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={<Wifi size={11} />}
                  classNames={{
                    base: "text-xs h-6 bg-blue-50 text-blue-600 border-blue-200",
                    content: "px-1",
                  }}
                >
                  Remote
                </Chip>
              )}

              {/* Hybrid */}
              {!isRemote && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="default"
                  startContent={<Building2 size={11} />}
                  classNames={{ base: "text-xs h-6", content: "px-1" }}
                >
                  On-site
                </Chip>
              )}

              {/* Hot job */}
              {isHot && (
                <Chip
                  size="sm"
                  variant="flat"
                  color="warning"
                  startContent={<Flame size={11} />}
                  classNames={{ base: "text-xs h-6", content: "px-1" }}
                >
                  Hot Job
                </Chip>
              )}

              {/* Easy Apply */}
              {easyApply && (
                <Chip
                  size="sm"
                  variant="solid"
                  color="success"
                  startContent={<Star size={11} />}
                  classNames={{
                    base: "text-xs h-6 bg-emerald-500 text-white",
                    content: "px-1 font-semibold",
                  }}
                >
                  Easy Apply
                </Chip>
              )}
            </div>

            {/* Deadline */}
            {deadline && (
              <p className="text-[11px] text-default-400 mt-2">
                Deadline: {formatDeadline(deadline)}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// ─── Usage Example ───────────────────────────────────────────────────────────
//
// const job = {
//   _id: "6a22c57db49bcd121b5f1579",
//   title: "UX UI Designer",
//   category: "Finance",
//   type: "full-time",
//   salaryMin: "98",
//   salaryMax: "120",
//   currency: "USD",
//   deadline: "2026-09-20",
//   city: "San Francisco",
//   country: "United States",
//   isRemote: true,
//   status: "active",
//   companyId: "6a22b900cfd6829ee244eab0",
//   companyName: "Adobe",
//   companyLogo: "https://i.ibb.co/d4scBpNk/adobe.png",
//   isHot: false,
//   easyApply: true,
// };
//
// <JobCard job={job} isActive={false} onSelect={(j) => console.log(j)} />
