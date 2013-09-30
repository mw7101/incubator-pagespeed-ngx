/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: jmarantz@google.com (Joshua Marantz)

#include "net/instaweb/rewriter/public/resource_slot.h"

#include "base/logging.h"
#include "net/instaweb/htmlparse/public/html_element.h"
#include "net/instaweb/rewriter/public/resource.h"
#include "net/instaweb/rewriter/public/rewrite_driver.h"
#include "net/instaweb/rewriter/public/rewrite_options.h"
#include "net/instaweb/util/public/string_util.h"

namespace net_instaweb {

class RewriteContext;

ResourceSlot::~ResourceSlot() {
}

void ResourceSlot::SetResource(const ResourcePtr& resource) {
  resource_ = ResourcePtr(resource);
}

void ResourceSlot::DirectSetUrl(const StringPiece& url) {
  LOG(DFATAL) << "Trying to direct-set a URL on a slot that does not "
      "support it: " << LocationString();
}

RewriteContext* ResourceSlot::LastContext() const {
  if (contexts_.empty()) {
    return NULL;
  }
  return contexts_.back();
}

void ResourceSlot::DetachContext(RewriteContext* context) {
  if (contexts_.front() == context) {
    contexts_.pop_front();
  } else if (contexts_.back() == context) {
    contexts_.pop_back();
  } else {
    DLOG(FATAL) << "Can only detach first or last context";
  }
}

FetchResourceSlot::~FetchResourceSlot() {
}

void FetchResourceSlot::Render() {
  DLOG(FATAL) << "FetchResourceSlot::Render should never be called";
}

GoogleString FetchResourceSlot::LocationString() {
  return StrCat("Fetch of ", resource()->url());
}

HtmlResourceSlot::HtmlResourceSlot(const ResourcePtr& resource,
                                   HtmlElement* element,
                                   HtmlElement::Attribute* attribute,
                                   RewriteDriver* driver)
    : ResourceSlot(resource),
      element_(element),
      attribute_(attribute),
      driver_(driver),
      // TODO(sligocki): This is always the URL used to create resource, right?
      // Maybe we could construct the input resource here just to guarantee
      // that and simplify the code?
      url_relativity_(
          GoogleUrl::FindRelativity(attribute->DecodedValueOrNull())),
      begin_line_number_(element->begin_line_number()),
      end_line_number_(element->end_line_number()) {
}

HtmlResourceSlot::~HtmlResourceSlot() {
}

void HtmlResourceSlot::Render() {
  if (disable_rendering()) {
    return;  // nothing done here.
  } else if (should_delete_element()) {
    if (element_ != NULL) {
      driver_->DeleteNode(element_);
      element_ = NULL;
    }
  } else {
    // TODO(sligocki): Maybe collect all uses of this pattern into a
    // single function like RelativizeOrPassthrough().
    if (driver_->options()->preserve_url_relativity()) {
      // Set possibly relative URL.
      // TODO(sligocki): Return GoogleUrl from resource()->url().
      GoogleUrl output_url(resource()->url());
      DirectSetUrl(output_url.Relativize(url_relativity_, driver_->base_url()));
    } else {
      // Set absolute URL.
      DirectSetUrl(resource()->url());
    }
    // Note that to insert image dimensions, we explicitly save
    // a reference to the element in the enclosing Context object.
  }
}

GoogleString HtmlResourceSlot::LocationString() {
  if (begin_line_number_ == end_line_number_) {
    return StrCat(driver_->id(), ":", IntegerToString(begin_line_number_));
  } else {
    return StrCat(driver_->id(), ":",
                  IntegerToString(begin_line_number_),
                  "-", IntegerToString(end_line_number_));
  }
}

void HtmlResourceSlot::DirectSetUrl(const StringPiece& url) {
  DCHECK(attribute_ != NULL);
  if (attribute_ != NULL) {
    attribute_->SetValue(url);
  }
}

// TODO(jmarantz): test sanity of set maintenance using this comparator.
bool HtmlResourceSlotComparator::operator()(const HtmlResourceSlotPtr& p,
                                            const HtmlResourceSlotPtr& q)
  const {
  if (p->element() < q->element()) {
    return true;
  } else if (p->element() > q->element()) {
    return false;
  }
  if (p->attribute() < q->attribute()) {
    return true;
  }
  return false;
}

}  // namespace net_instaweb