import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import useFormDataAlamat from "./useFormDataAlamat";
import useRegions from "@/hooks/use-region";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { IRegions } from "@/types/Regions";
import { Skeleton } from "@/components/ui/skeleton";
interface PropTypes {
  refetchProfile: () => void;
}
const FormDataAlamat = (props: PropTypes) => {
  const { refetchProfile } = props;
  const { form, dataAddress, isPendingUpdateAddress, handleUpdateAddress, isSuccessUpdateAddress } = useFormDataAlamat();
  const { dataProvinces, dataRegencies, dataDistricts, dataVillages, setDistrictId, setProvinceId, setRegencyId } = useRegions();

  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (dataAddress) {
      setValue("address", dataAddress?.address ?? "");
      setValue("rt", dataAddress?.rt ?? "");
      setValue("rw", dataAddress?.rw ?? "");
      setValue("postalCode", dataAddress?.postalCode ?? "");
      setValue("province", dataAddress?.province);
      setProvinceId(dataAddress?.province);
      setValue("city", dataAddress?.city);
      setRegencyId(dataAddress?.city);
      setValue("district", dataAddress?.district);
      setDistrictId(dataAddress?.district);
      setValue("village", dataAddress?.village);
    }
    if (isSuccessUpdateAddress) refetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, dataAddress, refetchProfile]);

  return (
    <Card className="p-4 border-none">
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleUpdateAddress)}>
          <div className="flex flex-col items-start gap-2 text-center w-fit">
            <h1 className="text-md font-bold underline underline-offset-1 underline-primary decoration-primary">Form Data Alamat</h1>
          </div>
          <div className={cn("grid grid-cols-1 lg:grid-cols-4 items-start", Object.keys(errors).length > 0 ? "gap-3" : "gap-6")}>
            <FormField
              control={control}
              name="address"
              defaultValue={dataAddress?.address || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="rt"
              defaultValue={dataAddress?.rt || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RT</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="rw"
              defaultValue={dataAddress?.rw || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="postalCode"
              defaultValue={dataAddress?.postalCode || ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode POS</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {dataAddress && dataProvinces.length < 1 ? (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("justify-between border-primary-foreground", !field.value && "text-muted-foreground")}
                          >
                            {dataProvinces.length > 0 && field.value
                              ? dataProvinces.find((province: IRegions) => `${province.id}` === field.value)?.name
                              : "Pilih Provinsi"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        {dataProvinces.length > 0 && (
                          <Command>
                            <CommandList>
                              <CommandEmpty>Tidak ada data</CommandEmpty>
                              <CommandGroup>
                                {dataProvinces.map((province: IRegions) => (
                                  <CommandItem
                                    value={`${province.id}`}
                                    key={province.name}
                                    onSelect={() => {
                                      setValue("province", `${province.id}`);
                                      setProvinceId(`${province.id}`);
                                    }}
                                  >
                                    {province.name}
                                    <Check className={cn("ml-auto", `${province.id}` === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {dataAddress && dataRegencies.length < 1 ? (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("justify-between border-primary-foreground", !field.value && "text-muted-foreground")}
                          >
                            {dataRegencies.length > 0 && field.value
                              ? dataRegencies.find((city: IRegions) => `${city.id}` === field.value)?.name
                              : "Pilih Kota"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        {dataRegencies.length > 0 && (
                          <Command>
                            <CommandList>
                              <CommandEmpty>Tidak ada data</CommandEmpty>
                              <CommandGroup>
                                {dataRegencies.map((city: IRegions) => (
                                  <CommandItem
                                    value={`${city.id}`}
                                    key={city.name}
                                    onSelect={() => {
                                      setValue("city", `${city.id}`);
                                      setRegencyId(`${city.id}`);
                                    }}
                                  >
                                    {city.name}
                                    <Check className={cn("ml-auto", `${city.id}` === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {dataAddress && dataDistricts.length < 1 ? (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <FormField
                control={control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("justify-between border-primary-foreground", !field.value && "text-muted-foreground")}
                          >
                            {dataDistricts.length > 0 && field.value
                              ? dataDistricts.find((district: IRegions) => `${district.id}` === field.value)?.name
                              : "Pilih Kecamatan"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        {dataDistricts.length > 0 && (
                          <Command>
                            <CommandList>
                              <CommandEmpty>Tidak ada data</CommandEmpty>
                              <CommandGroup>
                                {dataDistricts.map((district: IRegions) => (
                                  <CommandItem
                                    value={`${district.id}`}
                                    key={district.name}
                                    onSelect={() => {
                                      setValue("district", `${district.id}`);
                                      setDistrictId(`${district.id}`);
                                    }}
                                  >
                                    {district.name}
                                    <Check className={cn("ml-auto", `${district.id}` === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {dataAddress && dataVillages.length < 1 ? (
              <div className="">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <FormField
                control={control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("justify-between border-primary-foreground", !field.value && "text-muted-foreground")}
                          >
                            {dataVillages.length > 0 && field.value
                              ? dataVillages.find((village: IRegions) => `${village.id}` === field.value)?.name
                              : "Pilih Desa"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        {dataVillages.length > 0 && (
                          <Command>
                            <CommandList>
                              <CommandEmpty>Tidak ada data</CommandEmpty>
                              <CommandGroup>
                                {dataVillages.map((village: IRegions) => (
                                  <CommandItem
                                    value={`${village.id}`}
                                    key={village.name}
                                    onSelect={() => {
                                      setValue("village", `${village.id}`);
                                    }}
                                  >
                                    {village.name}
                                    <Check className={cn("ml-auto", `${village.id}` === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
