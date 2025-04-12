import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import useFormDataAlamat from "./useFormDataAlamat";
import useRegions from "@/hooks/use-region";
import { IRegions } from "@/types/Regions";
import { Skeleton } from "@/components/ui/skeleton";
import { InputWithLabel } from "@/components/commons/inputs/InputWithLabel";
import { AddressSchemaType } from "@/schemas/address.schema";
import { SelectPopoverWithLabel } from "@/components/commons/inputs/SelectPopoverWithLabel";
interface PropTypes {
  refetchProfile: () => void;
}
const FormDataAlamat = (props: PropTypes) => {
  const { refetchProfile } = props;
  const { form, dataAddress, isPendingUpdateAddress, handleUpdateAddress, isSuccessUpdateAddress } = useFormDataAlamat();
  const { dataProvinces, dataRegencies, dataDistricts, dataVillages, setDistrictId, setProvinceId, setRegencyId } = useRegions();

  const {
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (dataAddress) {
      form.reset(dataAddress);
      setProvinceId(dataAddress?.province);
      setRegencyId(dataAddress?.city);
      setDistrictId(dataAddress?.district);
    }
    if (isSuccessUpdateAddress) refetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, dataAddress, refetchProfile, form, isSuccessUpdateAddress]);

  return (
    <Card className="p-4 border-none">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateAddress)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Data Alamat</h1>
          </div>
          <div className={cn("grid grid-cols-1 lg:grid-cols-4 items-start", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
            <InputWithLabel<AddressSchemaType> fieldTitle="Alamat" nameInSchema="address" />
            <InputWithLabel<AddressSchemaType> fieldTitle="RT" nameInSchema="rt" />
            <InputWithLabel<AddressSchemaType> fieldTitle="RW" nameInSchema="rw" />
            <InputWithLabel<AddressSchemaType> fieldTitle="Kode POS" nameInSchema="postalCode" />
            {dataAddress && dataProvinces.length > 0 ? (
              <SelectPopoverWithLabel<AddressSchemaType>
                fieldTitle="Provinsi"
                nameInSchema="province"
                options={dataProvinces.map((data: IRegions) => ({
                  label: data.name,
                  value: `${data.id}`,
                }))}
              />
            ) : (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
            {dataRegencies.length > 0 ? (
              <SelectPopoverWithLabel<AddressSchemaType>
                fieldTitle="Kabupaten/Kota"
                nameInSchema="city"
                options={dataRegencies.map((data: IRegions) => ({
                  label: data.name,
                  value: `${data.id}`,
                }))}
              />
            ) : (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}

            {dataDistricts.length > 0 ? (
              <SelectPopoverWithLabel<AddressSchemaType>
                fieldTitle="Kecamatan"
                nameInSchema="district"
                options={dataDistricts.map((data: IRegions) => ({
                  label: data.name,
                  value: `${data.id}`,
                }))}
              />
            ) : (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}

            {dataVillages.length > 0 ? (
              <SelectPopoverWithLabel<AddressSchemaType>
                fieldTitle="Desa"
                nameInSchema="village"
                options={dataVillages.map((data: IRegions) => ({
                  label: data.name,
                  value: `${data.id}`,
                }))}
              />
            ) : (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full lg:max-w-xs" disabled={isPendingUpdateAddress}>
              {isPendingUpdateAddress ? <Spinner /> : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default FormDataAlamat;
