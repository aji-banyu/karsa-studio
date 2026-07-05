import { BiLinkExternal, BiCodeAlt, BiPen } from "react-icons/bi";
import ButtonLink from "../atoms/ButtonLink";

export default function SmartCTA({ liveLink, sourceLink, figmaLink }) {
  return (
    <div className="flex flex-wrap gap-4">
      {liveLink && (
        <ButtonLink
          href={liveLink}
          icon={<BiLinkExternal className="text-[2rem]" />}
          text="Kunjungi Website"
          variant="primary"
        />
      )}
      {sourceLink && (
        <ButtonLink
          href={sourceLink}
          icon={<BiCodeAlt className="text-[2rem]" />}
          text="Source Code"
          variant="glass"
        />
      )}
      {figmaLink && !liveLink && !sourceLink && (
        <ButtonLink
          href={figmaLink}
          icon={<BiPen className="text-[2rem]" />}
          text="Lihat Figma"
          variant="glass"
        />
      )}
    </div>
  );
}
