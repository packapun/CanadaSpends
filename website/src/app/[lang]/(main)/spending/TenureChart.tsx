import { BarList } from "@/components/BarList";
import { useLingui } from "@lingui/react/macro";

export const TenureChart = () => {
  const { t } = useLingui()

  const tenureData = [
    { name: t`Casual`, value: 6990 },
    { name: t`Indeterminate`, value: 301131 },
    { name: t`Student`, value: 9120 },
    { name: t`Term`, value: 47460 },
  ]

  return <BarList
    className="h-40"
    data={tenureData}
    valueFormatter={(value) => Intl.NumberFormat('en-US', {
      notation: 'compact',
    }).format(Number(value))}
  />

};
