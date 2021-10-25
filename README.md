# schemaorg-to-proto

```bash
$ node generate-proto.js > schemaorg-product.proto
```

## Product

* [Product](https://schema.org/Product)
* [Release 13.0](https://github.com/schemaorg/schemaorg/tree/main/data/releases/13.0/)

```proto
message Product {
  // from Product
  PropertyValue additional_property = 1; // A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.\n\n Always use specific schema.org properties when a) they exist and b) you can populate them. Using PropertyValue as a substitute will typically not trigger the same effect as using the original, specific property.     
  AggregateRating aggregate_rating = 2; // The average rating based on multiple ratings or reviews.
  Audience audience = 3; // Intended audience for an item, i.e. the group for whom the item was created.
  string award = 4; // Data type: Text.
  string awards = 5; // Data type: Text.
  oneof brand {
    Organization organization = 6; // An organization such as a school, NGO, corporation, club, etc.
    Brand brand = 7; // A brand is a name used by an organization or business person for labeling a product, product group, or similar.
  }
  oneof category {
    string text = 8; // Data type: Text.
    PhysicalActivityCategory physical_activity_category = 9; // Categories of physical activity, organized by physiologic classification.
    Thing thing = 10; // The most generic type of item.
    string url = 11; // Data type: URL.
  }
  string color = 12; // Data type: Text.
  string country_of_assembly = 13; // Data type: Text.
  string country_of_last_processing = 14; // Data type: Text.
  Country country_of_origin = 15; // A country.
  oneof depth {
    Distance distance = 16; // Properties that take Distances as values are of the form '&lt;Number&gt; &lt;Length unit of measure&gt;'. E.g., '7 ft'.
    QuantitativeValue quantitative_value = 17; //  A point value or interval for product characteristics and other purposes.
  }
  string gtin = 18; // Data type: Text.
  string gtin_12 = 19; // Data type: Text.
  string gtin_13 = 20; // Data type: Text.
  string gtin_14 = 21; // Data type: Text.
  string gtin_8 = 22; // Data type: Text.
  EnergyConsumptionDetails has_energy_consumption_details = 23; // EnergyConsumptionDetails represents information related to the energy efficiency of a product that consumes energy. The information that can be provided is based on international regulations such as for example [EU directive 2017/1369](https://eur-lex.europa.eu/eli/reg/2017/1369/oj) for energy labeling and the [Energy labeling rule](https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/energy-water-use-labeling-consumer) under the Energy Policy and Conservation Act (EPCA) in the US.
  QuantitativeValue has_measurement = 24; //  A point value or interval for product characteristics and other purposes.
  MerchantReturnPolicy has_merchant_return_policy = 25; // A MerchantReturnPolicy provides information about product return policies associated with an [[Organization]], [[Product]], or [[Offer]].
  oneof height {
    QuantitativeValue quantitative_value = 26; //  A point value or interval for product characteristics and other purposes.
    Distance distance = 27; // Properties that take Distances as values are of the form '&lt;Number&gt; &lt;Length unit of measure&gt;'. E.g., '7 ft'.
  }
  string in_product_group_with_id = 28; // Data type: Text.
  Product is_accessory_or_spare_part_for = 29; // Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
  Product is_consumable_for = 30; // Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
  oneof is_related_to {
    Product product = 31; // Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
    Service service = 32; // A service provided by an organization, e.g. delivery service, print services, etc.
  }
  oneof is_similar_to {
    Product product = 33; // Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
    Service service = 34; // A service provided by an organization, e.g. delivery service, print services, etc.
  }
  oneof is_variant_of {
    ProductModel product_model = 35; // A datasheet or vendor specification of a product (in the sense of a prototypical description).
    ProductGroup product_group = 36; // A ProductGroup represents a group of [[Product]]s that vary only in certain well-described ways, such as by [[size]], [[color]], [[material]] etc.  While a ProductGroup itself is not directly offered for sale, the various varying products that it represents can be. The ProductGroup serves as a prototype or template, standing in for all of the products who have an [[isVariantOf]] relationship to it. As such, properties (including additional types) can be applied to the ProductGroup to represent characteristics shared by each of the (possibly very many) variants. Properties that reference a ProductGroup are not included in this mechanism; neither are the following specific properties [[variesBy]], [[hasVariant]], [[url]]. 
  }
  OfferItemCondition item_condition = 37; // A list of possible conditions for the item.
  oneof logo {
    string url = 38; // Data type: URL.
    ImageObject image_object = 39; // An image file.
  }
  Organization manufacturer = 40; // An organization such as a school, NGO, corporation, club, etc.
  oneof material {
    Product product = 41; // Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
    string url = 42; // Data type: URL.
    string text = 43; // Data type: Text.
  }
  oneof model {
    string text = 44; // Data type: Text.
    ProductModel product_model = 45; // A datasheet or vendor specification of a product (in the sense of a prototypical description).
  }
  string mpn = 46; // Data type: Text.
  string nsn = 47; // Data type: Text.
  oneof offers {
    Demand demand = 48; // A demand entity represents the public, not necessarily binding, not necessarily exclusive, announcement by an organization or person to seek a certain type of goods or services. For describing demand using this type, the very same properties used for Offer apply.
    Offer offer = 49; // An offer to transfer some rights to an item or to provide a service — for example, an offer to sell tickets to an event, to rent the DVD of a movie, to stream a TV show over the internet, to repair a motorcycle, or to loan a book.\n\nNote: As the [[businessFunction]] property, which identifies the form of offer (e.g. sell, lease, repair, dispose), defaults to http://purl.org/goodrelations/v1#Sell; an Offer without a defined businessFunction value can be assumed to be an offer to sell.\n\nFor [GTIN](http://www.gs1.org/barcodes/technical/idkeys/gtin)-related fields, see [Check Digit calculator](http://www.gs1.org/barcodes/support/check_digit_calculator) and [validation guide](http://www.gs1us.org/resources/standards/gtin-validation-guide) from [GS1](http://www.gs1.org/).
  }
  oneof pattern {
    string text = 50; // Data type: Text.
    DefinedTerm defined_term = 51; // A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of category or subject classification, glossaries or dictionaries, product or creative work types, etc. Use the name property for the term being defined, use termCode if the term has an alpha-numeric code allocated, use description to provide the definition of the term.
  }
  string product_id = 52; // Data type: Text.
  string production_date = 53; // A date value in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601).
  string purchase_date = 54; // A date value in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601).
  string release_date = 55; // A date value in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601).
  Review review = 56; // A review of an item - for example, of a restaurant, movie, or store.
  Review reviews = 57; // A review of an item - for example, of a restaurant, movie, or store.
  oneof size {
    SizeSpecification size_specification = 58; // Size related properties of a product, typically a size code ([[name]]) and optionally a [[sizeSystem]], [[sizeGroup]], and product measurements ([[hasMeasurement]]). In addition, the intended audience can be defined through [[suggestedAge]], [[suggestedGender]], and suggested body measurements ([[suggestedMeasurement]]).
    DefinedTerm defined_term = 59; // A word, name, acronym, phrase, etc. with a formal definition. Often used in the context of category or subject classification, glossaries or dictionaries, product or creative work types, etc. Use the name property for the term being defined, use termCode if the term has an alpha-numeric code allocated, use description to provide the definition of the term.
    string text = 60; // Data type: Text.
    QuantitativeValue quantitative_value = 61; //  A point value or interval for product characteristics and other purposes.
  }
  string sku = 62; // Data type: Text.
  string slogan = 63; // Data type: Text.
  QuantitativeValue weight = 64; //  A point value or interval for product characteristics and other purposes.
  oneof width {
    Distance distance = 65; // Properties that take Distances as values are of the form '&lt;Number&gt; &lt;Length unit of measure&gt;'. E.g., '7 ft'.
    QuantitativeValue quantitative_value = 66; //  A point value or interval for product characteristics and other purposes.
  }
  // inherited from Thing
  string additional_type = 67; // Data type: URL.
  string alternate_name = 68; // Data type: Text.
  string description = 69; // Data type: Text.
  string disambiguating_description = 70; // Data type: Text.
  oneof identifier {
    PropertyValue property_value = 71; // A property-value pair, e.g. representing a feature of a product or place. Use the 'name' property for the name of the property. If there is an additional human-readable version of the value, put that into the 'description' property.\n\n Always use specific schema.org properties when a) they exist and b) you can populate them. Using PropertyValue as a substitute will typically not trigger the same effect as using the original, specific property.     
    string text = 72; // Data type: Text.
    string url = 73; // Data type: URL.
  }
  oneof image {
    ImageObject image_object = 74; // An image file.
    string url = 75; // Data type: URL.
  }
  oneof main_entity_of_page {
    string url = 76; // Data type: URL.
    CreativeWork creative_work = 77; // The most generic kind of creative work, including books, movies, photographs, software programs, etc.
  }
  string name = 78; // Data type: Text.
  Action potential_action = 79; // An action performed by a direct agent and indirect participants upon a direct object. Optionally happens at a location with the help of an inanimate instrument. The execution of the action may produce a result. Specific action sub-type documentation specifies the exact expectation of each argument/role.\n\nSee also [blog post](http://blog.schema.org/2014/04/announcing-schemaorg-actions.html) and [Actions overview document](https://schema.org/docs/actions.html).
  string same_as = 80; // Data type: URL.
  oneof subject_of {
    Event event = 81; // An event happening at a certain time and location, such as a concert, lecture, or festival. Ticketing information may be added via the [[offers]] property. Repeated events may be structured as separate Event objects.
    CreativeWork creative_work = 82; // The most generic kind of creative work, including books, movies, photographs, software programs, etc.
  }
  string url = 83; // Data type: URL.
}
```
