import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByTitle"
})
export class FilterByTitlePipe implements PipeTransform {
  transform(items: any, searchText: String): any {
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      if (item.name !== undefined) {
        return item.name.toLowerCase().includes(searchText);
      }
    });
  }
}
