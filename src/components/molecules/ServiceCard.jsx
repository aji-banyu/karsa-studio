import Button from "../atoms/Button";

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="flex-1 basis-120 bg-second-bg p-[3rem_2rem_4rem] rounded-4xl text-center border-2 border-body-bg transition-all duration-500 hover:border-main-color hover:scale-[1.02]">
      <Icon className="text-[7rem] text-main-color mx-auto mb-4" />
      <h3 className="text-[2.6rem] font-bold">{title}</h3>
      <p className="text-[1.6rem] my-8">{description}</p>
      <Button href="#">Read More</Button>
    </div>
  );
}
