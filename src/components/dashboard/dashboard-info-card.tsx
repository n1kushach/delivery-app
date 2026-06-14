interface IDashboardInfoCard {
  top: string;
  mid: string;
  bottom: string;
}

const DashboardInfoCard = (props: IDashboardInfoCard) => {
  const { top, mid, bottom } = props;
  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <p className="text-muted-foreground text-sm">{top}</p>
      <p className="mt-1 truncate text-xl font-medium">{mid}</p>
      <p className="text-muted-foreground mt-1 text-sm">{bottom}</p>
    </div>
  );
};

export default DashboardInfoCard;
